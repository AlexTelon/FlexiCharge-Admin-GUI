/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { manageUsers } from '../../__mock-data__/users';
import { ManageUser, IManageUserCollection } from '../interfaces';

export default class ManageUserCollection implements IManageUserCollection {
  users = manageUsers;

  async getAllUsers(): Promise<[ManageUser[], any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([this.users, null]);
      }, 1000);
    });
  }

  async getUserById(userId: string): Promise<ManageUser | null> {
    return new Promise((resolve, reject) => {
      // Look up in local
      // If not found then try remote

      setTimeout(() => {
        resolve(this.users.filter((users) => users.id === userId)[0] || null);
      }, 100);
    });
  }

  async addUser(fields: Omit<ManageUser, 'id'>): Promise<[string | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const errorObj = this.validateFields(fields);
        if (Object.keys(errorObj).length > 0) resolve([null, errorObj]);
        
        const manageUser: ManageUser = {
          ...fields,
          id: `${this.users.length + 1}`
        };
        this.users.push(manageUser);
        resolve([manageUser.id, null]);
      }, 1000);
    });
  }

  async updateUser(userId: string, fields: Omit<ManageUser, 'id'>): Promise<[ManageUser | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = this.users.findIndex((users) => users.id === userId);
        if (userIndex === -1) return [null, { errorMessage: 'Could not find the requested Manage User' }];

        const errorObj = this.validateFields(fields);
        if (Object.keys(errorObj).length > 0) resolve([null, errorObj]);

        const ManageUsers = {
          ...fields,
          id: this.users[userIndex].id
        };

        this.users[userIndex] = ManageUsers;
        resolve([ManageUsers, null]);
      }, 1000);
    });
  }

  private isNametaken(name: string) {
    for (const user of this.users) {
      if (user.name === name) return true;
    }
    return false;
  }

  private validPhoneNumber(phoneNumber: string) {
    let regex = /^(([+]46)\s*(7)|07)[02369]\s*(\d{4})\s*(\d{3})$/;
    // eslint-disable-next-line prefer-regex-literals
    regex = new RegExp('^(([+]46)\s*(7)|07)[02369]\s*(\d{4})\s*(\d{3})$');

    for (const user of this.users) {
      if (phoneNumber.match(regex)) return true;
    }
    return false;
  }

  private validateFields(fields: Omit<ManageUser, 'id'>): any | null {
    const errorObj: any = {};
    if (fields.name && this.isNametaken(fields.name)) errorObj.name = 'Name is taken';
    if (fields.phoneNumber && this.validPhoneNumber(fields.phoneNumber)) errorObj.phoneNumber = 'Not a Valid Phone number';
    return errorObj;
  }
}