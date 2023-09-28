/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { User, Admin } from '../types';
import { convertRemoteUsersToLocal, toUserAttributes } from '../utility/remote-user-functions';


export function handleUsersData(usersData: any){
    const users: User[] = [];
      for (const userData of usersData) {
        const user = convertRemoteUsersToLocal(userData);
        users.push(user);
      }
      return users
}

export function handleAdminsData(adminsData: any){
    const admins: Admin[] = [];
    for (const adminData of adminsData) {
      const admin = convertRemoteUsersToLocal(adminData) as Admin;
      admins.push(admin);
    }
    return admins;
  }
