/* eslint-disable */
/* eslint-disable react/jsx-no-undef */

import { Transaction, ITransaction } from '../types';
import { FLEXICHARGE_API_URL } from '@/appConfig';
import axios from 'axios';
import { authenticationProvider } from '..';

export default class ManageTransaction implements ITransaction {

  public async getTransactionsByUserId(username: string): Promise<[Transaction[] | null, any | null]> {
    try {
      const res = await axios.get(`${FLEXICHARGE_API_URL}/transactions/userTransactions/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return [res.data, null];
    } catch (error: any) {
      return [null ,error];
    }
  }
}