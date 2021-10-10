/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import appConfig from '@/appConfig';
import axios from 'axios';
import { authenticationProvider } from '..';
import { manageAdmins } from '../../__mock-data__/admins';
import { ManageAdmin, IManageAdminCollection } from '../types';
import { convertRemoteUserToLocal } from '../utility/remote-user-functions';

export default class ManageAdminCollection implements IManageAdminCollection {  
  admins = manageAdmins;

  async deleteAdmin(username: string): Promise<boolean> {
    return true;
  }
  
  async getAllAdmins(): Promise<[ManageAdmin[] | null, any | null]> {
    try {
      const res = await axios.get(`${appConfig.FLEXICHARGE_API_URL}/auth/admin/`, {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });

      const admins: ManageAdmin[] = [];
      for (const adminData of res.data) {
        const admin = convertRemoteUserToLocal(adminData) as ManageAdmin;
        admins.push(admin);
      }

      return [admins, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  async getAdminById(username: string): Promise<ManageAdmin | null> {
    try {
      const res = await axios.get(`${appConfig.FLEXICHARGE_API_URL}/auth/admin/${username}`, {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });
      
      const admin = convertRemoteUserToLocal(res.data) as ManageAdmin;
      
      return admin;
    } catch (error: any) {      
      return null;
    }
  }

  async addAdmin(fields: Omit<ManageAdmin, 'id'>): Promise<[string | null, any | null]> {
    try {
      const res = await axios.post(`${appConfig.FLEXICHARGE_API_URL}/auth/admin/`, {
        ...fields
      }, {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });
      return [res.data, null];
    } catch (error: any) {
      const errorObj: any = {};

      if (error.response) {
        switch (error.response.data.code) {
          case 'UsernameExistsException':
            errorObj.username = 'Username or Email taken';
            errorObj.email = 'Username or Email taken';
            break;
          case 'InvalidPasswordException':
            errorObj.password = (error.response.data.message as string).split(': ')[1];
            break;
          case 'InvalidParameterException':
            errorObj.email = 'Must be correct format';
            break;
          default:
            errorObj.error = 'An error occured';
            break;
        }
      } else if (error.request) {
        errorObj.error = 'Could not connect to server';
      }

      return [null, errorObj];
    };
  }

  async updateAdmin(adminId: string, fields: Omit<ManageAdmin, 'username'>): Promise<[ManageAdmin | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const adminIndex = this.admins.findIndex((admins) => admins.username === adminId);
        if (adminIndex === -1) return [null, { errorMessage: 'Could not find the requested Manage Admin' }];

        const errorObj = this.validateFields(fields);
        if (Object.keys(errorObj).length > 0) resolve([null, errorObj]);

        const ManageAdmins = {
          ...fields,
          username: this.admins[adminIndex].username
        };

        this.admins[adminIndex] = ManageAdmins;
        resolve([ManageAdmins, null]);
      }, 1000);
    });
  }

  private isNametaken(name: string) {
    for (const admin of this.admins) {
      if (admin.name === name) return true;
    }
    return false;
  }

  private validateFields(fields: Omit<ManageAdmin, 'username'>): any | null {
    const errorObj: any = {};
    if (fields.name && this.isNametaken(fields.name)) errorObj.name = 'Name is taken';
    return errorObj;
  }
}