/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { ManageUser, ManageAdmin } from '../types';
import { convertRemoteUserToLocal, toUserAttributes } from '../utility/remote-user-functions';


export function handleUsersData(usersData: any){
    const users: ManageUser[] = [];
      for (const userData of usersData) {
        const user = convertRemoteUserToLocal(userData);
        users.push(user);
      }
      return users
}

export function handleAdminsData(adminsData: any){
    const admins: ManageAdmin[] = [];
    for (const adminData of adminsData) {
      const admin = convertRemoteUserToLocal(adminData) as ManageAdmin;
      admins.push(admin);
    }
    return admins;
  }