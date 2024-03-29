/* eslint-disable */
/* eslint-disable react/jsx-no-undef */

import { Transaction, ITransaction } from '../types';
import { FLEXICHARGE_API_URL } from '@/appConfig';
import axiosInstance from '../utility/axios-instance';
import { authenticationProvider } from '..';

export default class ManageTransaction implements ITransaction {

  public async getTransactionsByUserId(username: string): Promise<[Transaction[] | null, any | null]> {
    try {
      const res = await axiosInstance.get(`${FLEXICHARGE_API_URL}/transactions/userTransactions/${username}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      return [res.data, null];
    } catch (error: any) {
      return [null ,error];
    }
  }
}