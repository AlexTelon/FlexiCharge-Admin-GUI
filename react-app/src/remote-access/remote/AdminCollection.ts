/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { FLEXICHARGE_API_URL } from '@/appConfig';
import axios from 'axios';
import { ManageAdmin, IManageAdminCollection } from '../types';
import { convertRemoteUserToLocal, toUserAttributes } from '../utility/remote-user-functions';
import { handleAdminsData } from './business-logic';

export default class ManageAdminCollection implements IManageAdminCollection {  
  async deleteAdmin(username: string): Promise<boolean> {
    try {
      await axios.delete(`${FLEXICHARGE_API_URL}/auth/admin/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      return true;
    } catch (error: any) {
      if (error.response) {
        return false;
      }
      return false;
    }
  }
  
  async getAllAdmins(): Promise<[ManageAdmin[] | null, any | null]> {
    try {
      const res = await axios.get(`${FLEXICHARGE_API_URL}/auth/admin/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const admins = handleAdminsData(res.data.Users)
      return [admins, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  async getAdminById(username: string): Promise<ManageAdmin | null> {
    try {
      const res = await axios.get(`${FLEXICHARGE_API_URL}/auth/admin/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
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
      const res = await axios.post(`${FLEXICHARGE_API_URL}/auth/admin/`, {
        ...fields
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
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

  async updateAdmin(username: string, fields: Omit<ManageAdmin, 'username'>): Promise<[ManageAdmin | null, any | null]> {
    try {
      const userAttributes = toUserAttributes(fields);
      const res = await axios.put(`${FLEXICHARGE_API_URL}/auth/admin/${username}`, {
        userAttributes
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const admin = convertRemoteUserToLocal(res.data) as ManageAdmin;
      return [admin, null];
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
    }
  }

}