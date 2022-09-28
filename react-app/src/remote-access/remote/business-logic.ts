import { ManageUser, ManageTransaction, ManageAdmin } from '../types';
import { convertRemoteUserToLocal, toUserAttributes } from '../utility/remote-user-functions';


export function handleUsersData(usersData: string){
    const users: ManageUser[] = [];
      for (const userData of usersData) {
        const user = convertRemoteUserToLocal(userData);
        users.push(user);
      }
      return users
}

export function handleTransactionsData(transactionsData: any){
    const transactions: ManageTransaction[] = [];
    for (const transactionData of transactionsData) {
      transactions.push(transactionData);
    }
    console.log(transactions)
    return transactions
}

export function handleAdminsData(adminsData: any){
    const admins: ManageAdmin[] = [];
    for (const adminData of adminsData) {
      const admin = convertRemoteUserToLocal(adminData) as ManageAdmin;
      admins.push(admin);
    }
    return admins;
  }
