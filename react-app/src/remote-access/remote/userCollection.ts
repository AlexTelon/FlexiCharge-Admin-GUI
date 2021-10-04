/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ManageUser, IUser, IManageUserCollection } from '../interfaces';
import { authenticationProvider } from '..';
import appConfig from '../appConfig';
import axios from 'axios';

export default class UserCollection implements IManageUserCollection {
  public async getAllUsers(): Promise<[IUser[] | null, any | null]> {
    console.log('here');
    try {
      const res = await axios.get(`${appConfig.FLEXICHARGE_API_URL}/auth/admin/users`, {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });
      console.log('off');
      
      const users: IUser[] = [];
      for (const userData of res.data) {
        users.push({ 
          username: userData.Username,
          sub: userData.Attributes.sub,
          emailVerified: userData.Attributes.email_verified,
          name: userData.Attributes.name,
          familyName: userData.Attributes.family_name,
          email: userData.Attributes.email,
          userStatus: userData.UserStatus,
          enabled: userData.Enabled,
          created: userData.UserCreateDate,
          lastModified: userData.lastModified
        });
      }

      console.log(users);

      return [users, null];
    } catch (error: any) {
      console.log(error);
      return [null, error];
    }
  }
    
  public async addUser(fields: Omit<ManageUser, 'id'>): Promise<[string | null, any | null]> {
    try {
      const res = await axios.post(`${appConfig.FLEXICHARGE_API_URL}/users/`, fields);
      return [res.data, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  public async getUserById(id: string): Promise<[ManageUser | null, any | null]> {
    try {
      const res = await axios.get(`${appConfig.FLEXICHARGE_API_URL}/users/${id}`);
      return [res.data as ManageUser, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  public async updateUser(id: string, fields: Omit<ManageUser, 'id'>): Promise<[ManageUser | null, any | null]> {
    try {
      const res = await axios.put(`${appConfig.FLEXICHARGE_API_URL}/users/${id}`, fields);
      return [res.data, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}