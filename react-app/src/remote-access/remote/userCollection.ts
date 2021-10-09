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
        const user = this.convertRemoteUserToLocal(userData);
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
      const res = await axios.get(`${appConfig.FLEXICHARGE_API_URL}/auth/admin/users/${username}`, {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });
      
      const user = this.convertRemoteUserToLocal(res.data);
      
      return [user, null];
    } catch (error: any) {      
      return [null, error];
    }
  }

  public async updateUser(username: string, fields: Omit<ManageUser, 'username'>): Promise<[ManageUser | null, any | null]> {
    try {
      const userAttributes = this.toUserAttributes(fields);
      const res = await axios.put(`${appConfig.FLEXICHARGE_API_URL}/auth/admin/users/${username}`, {
        userAttributes
      },
      {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });
      
      const user = this.convertRemoteUserToLocal(res.data);
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

  private convertRemoteUserToLocal(remoteUser: any): ManageUser {
    // Leaving this here just in case
    /* const user: ManageUser = { 
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
    } */ 
    const localUser: ManageUser = { 
      username: remoteUser.Username,
      userStatus: remoteUser.UserStatus,
      enabled: remoteUser.Enabled,
      created: remoteUser.UserCreateDate,
      lastModified: remoteUser.lastModified,
      ...this.fromUserAttributes(remoteUser.UserAttributes ?? remoteUser.Attributes)
    };
    return localUser;
  }

  private fromUserAttributes (userAttributes: any[]): Partial<ManageUser> {
    const user: any = {};
    for (const attribute of userAttributes) {
      let { Name: key, Value: value } = attribute;

      switch (key) {
        case 'email_verified':
          key = 'emailVerified';
          value = value === 'true';
          break;
      }

      user[key] = value;
    }
    return user;
  }

  private toUserAttributes(fields: Omit<ManageUser, 'username'>): any[] {
    const userAttributes = [];
    for (const [key, value] of Object.entries(fields)) {
      userAttributes.push({
        Name: key,
        Value: value
      });
    }
    return userAttributes;
  }

  private validateFields(fields: ManageUser): any | null {
    const errorObj: any = {};

    return errorObj;
  }
}