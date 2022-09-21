import { ManageTransaction, IManageTransactionCollection } from '../types';
import { FLEXICHARGE_API_URL } from '@/appConfig';
import axios from 'axios';
import { authenticationProvider } from '..';

export default class ManageTransactionCollection implements IManageTransactionCollection {

    public async getTransactionsByUserId(username: string): Promise<[ManageTransaction[] | null, any | null]> {
        try {
          const res = await axios.get(`${FLEXICHARGE_API_URL}/transactions/userTransactions/${username}`, {
            headers: {
              Authorization: `Bearer ${authenticationProvider.getToken()}`
            }
          });
          
          const transactions: ManageTransaction[] = [];
          for (const transactionData of res.data) {
            transactions.push(transactionData);
          }
          return [transactions, null];
        } catch (error: any) {
          return [null ,error];
        }
    }
}