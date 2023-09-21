/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { User, IUser } from '../types';
import { FLEXICHARGE_API_URL } from '../appConfig';
import axios from 'axios';
import { convertRemoteUsersToLocal, toUserAttributes, convertRemoteUserToLocal } from '../utility/remote-user-functions';
import { handleUsersData } from './business-logic';

export default class ManageUser implements IUser {
  public async getAllUsers(): Promise<[User[] | null, any | null]> {
    try {
      const res = await axios.get(`${FLEXICHARGE_API_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const users = handleUsersData(res.data.Users)
      console.log(users);
      return [users, null];
    } catch (error: any) {
      return [null, error];
    }
  }
  
  public async addUser(fields: Omit<User, 'id'>): Promise<[User | null, any | null]> {
    try {
      const res = await axios.post(`${FLEXICHARGE_API_URL}/admin/users`, {
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

  public async getUserById(username: string): Promise<[User | null, any | null]> {
    try {
      const res = await axios.get(`${FLEXICHARGE_API_URL}/admin/users/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const user = convertRemoteUserToLocal(res.data);
      
      return [user, null];
    } catch (error: any) {      
      return [null, error];
    }
  }

  public async resetUserPassword(username: string): Promise<[User | null, any | null]> {
    try {
      const res = await axios({
        method: 'post',
        url: `${FLEXICHARGE_API_URL}/admin/reset-user-password/${username}`,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      return [res.data, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  public async updateUser(username: string, fields: Omit<User, 'username'>): Promise<[User | null, any | null]> {
    try {
      const userAttributes = toUserAttributes(fields);
      const res = await axios.put(`${FLEXICHARGE_API_URL}/admin/users/${username}`, {
        userAttributes
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const user = convertRemoteUsersToLocal(res.data);
      return [user, null];
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

  public async deleteUser (username: string): Promise<boolean> {
    try {
      await axios.delete(`${FLEXICHARGE_API_URL}/admin/users/${username}`, {
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
}