/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { mockAdmins } from '../../__mock-data__/admins';
import { Admin, IAdmin } from '../types';

export default class ManageAdmin implements IAdmin {
  admins = mockAdmins;

  async deleteAdmin(username: string): Promise<boolean> {
    return true;
  }

  async getAllAdmins(): Promise<[Admin[] | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([this.admins, null]);
      }, 1000);
    });
  }

  async getAdminById(adminId: string): Promise<Admin | null> {
    return new Promise((resolve, reject) => {
      // Look up in local
      // If not found then try remote

      setTimeout(() => {
        resolve(this.admins.filter((admins) => admins.username === adminId)[0] || null);
      }, 100);
    });
  }

  async addAdmin(fields: Omit<Admin, 'id'>): Promise<[string | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const errorObj = this.validateFields(fields);
        if (Object.keys(errorObj).length > 0) resolve([null, errorObj]);
        
        const manageAdmin: Admin = {
          ...fields,
          username: `${this.admins.length + 1}`
        };
        this.admins.push(manageAdmin);
        resolve([manageAdmin.username, null]);
      }, 1000);
    });
  }

  async updateAdmin(adminId: string, fields: Omit<Admin, 'username'>): Promise<[Admin | null, any | null]> {
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

  private validateFields(fields: Omit<Admin, 'username'>): any | null {
    const errorObj: any = {};
    if (fields.name && this.isNametaken(fields.name)) errorObj.name = 'Name is taken';
    return errorObj;
  }
}