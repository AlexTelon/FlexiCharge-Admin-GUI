/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { mockTransactions } from '../../__mock-data__/transactions';
import { Transaction, ITransaction } from '../types';

export default class ManageTransaction implements ITransaction {
  transactions = mockTransactions;

  async getTransactionsByUserId(username: string): Promise<[Transaction[] | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log([this.transactions, null]);
        resolve([this.transactions, null]);
      }, 1000);
    });
  }
}