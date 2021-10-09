/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ManageUser, IManageUserCollection } from '../types';
import { authenticationProvider } from '..';
import appConfig from '../appConfig';
import axios from 'axios';

export default class UserCollection implements IManageUserCollection {
  public async getAllUsers(): Promise<[ManageUser[] | null, any | null]> {
    try {
      const res = await axios.get(`${appConfig.FLEXICHARGE_API_URL}/auth/admin/users`, {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });
      
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
            case 'family_name': 
              user.family_name = attribute.Value;
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
      return [users, null];
    } catch (error: any) {
      return [null, error];
    }
  }
  
  public async addUser(fields: Omit<ManageUser, 'id'>): Promise<[ManageUser | null, any | null]> {
    try {
      const res = await axios.post(`${appConfig.FLEXICHARGE_API_URL}/auth/admin/users`, {
        ...fields
      }, {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });
      return [res.data, null];
    } catch (error: any) {
      return [null, error];
    };
  }

  public async getUserById(username: string): Promise<[ManageUser | null, any | null]> {
    try {
      const res = await axios.get(`${appConfig.FLEXICHARGE_API_URL}/auth/admin/users/${username}`, {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });
      
      const userData = res.data;
      const user: ManageUser = { 
        username: userData.Username,
        userStatus: userData.UserStatus,
        enabled: userData.Enabled,
        created: userData.UserCreateDate,
        lastModified: userData.lastModified
      };
      
      for (const attribute of userData.UserAttributes) {   
        switch (attribute.Name) {
          case 'sub': 
            user.sub = attribute.Value;
            break;
          case 'name': 
            user.name = attribute.Value;
            break;
          case 'family_name': 
            user.family_name = attribute.Value;
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
      
      return [user, null];
    } catch (error: any) {      
      return [null, error];
    }
  }

  public async updateUser(username: string, fields: Omit<ManageUser, 'username'>): Promise<[ManageUser | null, any | null]> {
    try {
      const userAttributes = [];
      for (const [key, value] of Object.entries(fields)) {
        userAttributes.push({
          Name: key,
          Value: value
        });
      }
      const res = await axios.put(`${appConfig.FLEXICHARGE_API_URL}/auth/admin/users/${username}`, {
        userAttributes
      },
      {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });
      
      return [res.data, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}