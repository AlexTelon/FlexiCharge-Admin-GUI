/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { InvoiceCollection, IInvoice } from '../types';
import { FLEXICHARGE_API_URL } from '@/appConfig';
import axios from 'axios';
import { authenticationProvider } from '..';

export default class ManageInvoice implements IInvoice {
  public async getInvoiceByUserId(id: any, status: string): Promise<[InvoiceCollection[] | null, any | null]> {
    try {
      const res = await axios.get(`${FLEXICHARGE_API_URL}/invoices/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return [res.data, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  public async getInvoiceByDate(year: string, month: string, status: string): Promise<[InvoiceCollection[] | null, any | null]> {
    try {
      const res = await axios.get(`${FLEXICHARGE_API_URL}/invoices/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return [res.data, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}