/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { ManageUser, IManageUserCollection } from '../types';
import { authenticationProvider } from '..';
import { FLEXICHARGE_API_URL } from '../appConfig';
import axios from 'axios';
import { convertRemoteUserToLocal, toUserAttributes } from '../utility/remote-user-functions';

export default class UserCollection implements IManageUserCollection {
  public async getAllUsers(): Promise<[ManageUser[] | null, any | null]> {
    try {
      const res = await axios.get(`${FLEXICHARGE_API_URL}/auth/admin/users`, {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });
      
      const users = this.handleUsersData(res.data.Users)
      return [users, null];
    } catch (error: any) {
      return [null, error];
    }
  }
  
  public async addUser(fields: Omit<ManageUser, 'id'>): Promise<[ManageUser | null, any | null]> {
    try {
      const res = await axios.post(`${FLEXICHARGE_API_URL}/auth/admin/users`, {
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

  public async getUserById(username: string): Promise<[ManageUser | null, any | null]> {
    try {
      const res = await axios.get(`${FLEXICHARGE_API_URL}/auth/admin/users/${username}`, {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });
      
      const user = convertRemoteUserToLocal(res.data);
      
      return [user, null];
    } catch (error: any) {      
      return [null, error];
    }
  }

  public async resetUserPassword(username: string): Promise<[ManageUser | null, any | null]> {
    try {
      const res = await axios.post(`${FLEXICHARGE_API_URL}/auth/admin/force-change-password`, {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        },
        body: {
          username: username,
          password: 'hejhej123123',
          session: authenticationProvider.getToken()
        }
      });
      return [res.data, null];
    } catch (error: any) {
      console.log(error);
      return [null, error];
    } 
  }

  public async updateUser(username: string, fields: Omit<ManageUser, 'username'>): Promise<[ManageUser | null, any | null]> {
    try {
      const userAttributes = toUserAttributes(fields);
      const res = await axios.put(`${FLEXICHARGE_API_URL}/auth/admin/users/${username}`, {
        userAttributes
      },
      {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });
      
      const user = convertRemoteUserToLocal(res.data);
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
      await axios.delete(`${FLEXICHARGE_API_URL}/auth/admin/users/${username}`, {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
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

  public handleUsersData(usersData: string){
    const users: ManageUser[] = [];
      for (const userData of usersData) {
        const user = convertRemoteUserToLocal(userData);
        users.push(user);
      }
      return users
  }
}