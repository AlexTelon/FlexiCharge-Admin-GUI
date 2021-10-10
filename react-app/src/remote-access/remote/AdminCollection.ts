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

  async getAdminById(adminId: string): Promise<ManageAdmin | null> {
    return new Promise((resolve, reject) => {
      // Look up in local
      // If not found then try remote

      setTimeout(() => {
        resolve(this.admins.filter((admins) => admins.username === adminId)[0] || null);
      }, 100);
    });
  }

  async addAdmin(fields: Omit<ManageAdmin, 'id'>): Promise<[string | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const errorObj = this.validateFields(fields);
        if (Object.keys(errorObj).length > 0) resolve([null, errorObj]);
        
        const manageAdmin: ManageAdmin = {
          ...fields,
          username: `${this.admins.length + 1}`
        };
        this.admins.push(manageAdmin);
        resolve([manageAdmin.username, null]);
      }, 1000);
    });
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