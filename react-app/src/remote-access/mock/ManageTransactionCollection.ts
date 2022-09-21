/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { manageTransactions } from '../../__mock-data__/transactions';
import { ManageTransaction, IManageTransactionCollection } from '../types';

export default class ManageTransactionCollection implements IManageTransactionCollection {
  transactions = manageTransactions;

  async getTransactionsByUserId(username: string): Promise<[ManageTransaction[] | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log([this.transactions, null]);
        resolve([this.transactions, null]);
      }, 1000);
    });
  }
}