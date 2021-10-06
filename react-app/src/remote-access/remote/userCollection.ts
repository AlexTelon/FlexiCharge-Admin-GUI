/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ManageUser, IManageUserCollection } from '../types';
import { authenticationProvider } from '..';
import appConfig from '../appConfig';
import axios from 'axios';

export default class UserCollection implements IManageUserCollection {
  public async getAllUsers(): Promise<[ManageUser[] | null, any | null]> {
    console.log('here');
    try {
      const res = await axios.get(`${appConfig.FLEXICHARGE_API_URL}/auth/admin/users`, {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });
      console.log('off');
      
      const users: ManageUser[] = [];
      for (const userData of res.data) {
        const user: ManageUser = { 
          username: userData.Username,
          userStatus: userData.UserStatus,
          enabled: userData.Enabled,
          created: userData.UserCreateDate,
          lastModified: userData.lastModified
        };
        
        for (const attribute of userData.Attributes) {   
          switch (attribute.Name) {
            case 'sub': 
              user.sub = attribute.Value;
              break;
            case 'name': 
              user.name = attribute.Value;
              break;
            case 'familyName': 
              user.familyName = attribute.Value;
              break;
            case 'email': 
              user.email = attribute.Value;
              break;
            case 'email_verified': 
              user.emailVerified = (attribute.Value === 'true');
              break;
            case 'password':
              user.password = attribute.value;
              break;
          }
        } 

        users.push(user);
      }

      console.log(users);

      return [users, null];
    } catch (error: any) {
      console.log(error);
      return [null, error];
    }
  }
  
  public async addUser(fields: Omit<ManageUser, 'id'>): Promise<[ManageUser | null, any | null]> {
    try {
      const res = await axios.post(`${appConfig.FLEXICHARGE_API_URL}/auth/admin/users`, {
        ...fields,
        family_name: fields.familyName
      }, {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });
      return [res.data, null];
    } catch (error: any) {
      console.log(error);
      return [null, error];
    };
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