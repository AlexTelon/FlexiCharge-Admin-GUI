/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { manageAdmins } from '../../__mock-data__/admins';
import { ManageAdmin, IManageAdminCollection } from '../interfaces';

export default class ManageAdminCollection implements IManageAdminCollection {  
  admins = manageAdmins;

  async getAllAdmins(): Promise<ManageAdmin[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.admins);
      }, 1000);
    });
  }

  async getAdminById(adminId: string): Promise<ManageAdmin | null> {
    return new Promise((resolve, reject) => {
      // Look up in local
      // If not found then try remote

      setTimeout(() => {
        resolve(this.admins.filter((admins) => admins.id === adminId)[0] || null);
      }, 100);
    });
  }

  async addAdmin(fields: Omit<ManageAdmin, 'id'>): Promise<[string | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const errorObj = this.validateFields(fields);
        if (Object.keys(errorObj).length > 0) resolve([null, errorObj]);
        
        const manageAdmin: ManageAdmin = {
          ...fields,
          id: `${this.admins.length + 1}`
        };
        this.admins.push(manageAdmin);
        resolve([manageAdmin.id, null]);
      }, 1000);
    });
  }

  async updateAdmin(adminId: string, fields: Omit<ManageAdmin, 'id'>): Promise<[ManageAdmin | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const adminIndex = this.admins.findIndex((admins) => admins.id === adminId);
        if (adminIndex === -1) return [null, { errorMessage: 'Could not find the requested Manage Admin' }];

        const errorObj = this.validateFields(fields);
        if (Object.keys(errorObj).length > 0) resolve([null, errorObj]);

        const ManageAdmins = {
          ...fields,
          id: this.admins[adminIndex].id
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

  private validateFields(fields: Omit<ManageAdmin, 'id'>): any | null {
    const errorObj: any = {};
    if (fields.name && this.isNametaken(fields.name)) errorObj.name = 'Name is taken';
    return errorObj;
  }
}