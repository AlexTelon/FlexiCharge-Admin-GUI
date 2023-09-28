/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { promises } from 'dns';
import { mockUsers } from '../../__mock-data__/users';
import { User, IUser } from '../types';

export default class ManageUser implements IUser {
  users = mockUsers;

  async getAllUsers(): Promise<[User[], any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log([this.users, null]);
        resolve([this.users, null]);
      }, 1000);
    });
  }

  async getUserById(userId: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      // Look up in local
      // If not found then try remote

      setTimeout(() => {
        resolve(this.users.filter((users) => users.username === userId)[0] || null);
      }, 100);
    });
  }

  async addUser(fields: Omit<User, 'id'>): Promise<[User | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const errorObj = this.validateFields(fields);
        if (Object.keys(errorObj).length > 0) resolve([null, errorObj]);
        
        const manageUser: User = {
          ...fields,
          username: `${this.users.length + 1}`
        };
        this.users.push(manageUser);
        resolve([manageUser, null]);
      }, 1000);
    });
  }

  async updateUser(username: string, fields: Omit<User, 'username'>): Promise<[User | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = this.users.findIndex((users) => users.username === username);
        if (userIndex === -1) return [null, { errorMessage: 'Could not find the requested Manage User' }];

        /*
        const errorObj = this.validateFields(fields);
        if (Object.keys(errorObj).length > 0) resolve([null, errorObj]);
        */
        const ManageUsers = {
          ...fields,
          username: this.users[userIndex].username
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

  private validateFields(fields: Omit<User, 'id'>): any | null {
    const errorObj: any = {};
    if (fields.name && this.isNametaken(fields.name)) errorObj.name = 'Name is taken';
    return errorObj;
  }

  async deleteUser(username: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = this.users.findIndex((users) => users.username === username);
        if (userIndex === -1) return [null, { errorMessage: 'Could not find the requested Manage User' }];

        this.users = this.users.filter((user) => user !== this.users[userIndex]);
      });
    });
  }

  async resetUserPassword(username: string): Promise<[User | null, any]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = this.users.findIndex((users) => users.username === username);
        if (userIndex === -1) {
          const error = { errorMessage: 'Could not find the User' };
          resolve([null, error]);
          return;
        }

        const manageUser = {
          ...this.users[userIndex],
          password: 'temp_password'
        };
        this.users[userIndex] = manageUser;
        resolve([manageUser, null]);
      });
    });
  }
}