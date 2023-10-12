/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { type InvoiceCollection, type IInvoice } from '../types';
import { FLEXICHARGE_API_URL } from '@/appConfig';
import axiosInstance from '../utility/axios-instance';
import { authenticationProvider } from '..';

export default class ManageInvoice implements IInvoice {
  public async getInvoiceByUserId(id: any, status: string): Promise<[InvoiceCollection[] | null, any | null]> {
    try {
      const res = await axiosInstance.get(`${FLEXICHARGE_API_URL}/invoices/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      return [res.data, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  public async getInvoiceByDate(year?: string, month?: string, status?: string): Promise<[InvoiceCollection[] | null, any | null]> {
    try {
      const params: any = {};
      if (year) params.year = year;
      if (month) params.month = month;
      if (status) params.status = status;

      const res = await axiosInstance.get(`${FLEXICHARGE_API_URL}/invoices/`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        params
      });
      return [res.data, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}