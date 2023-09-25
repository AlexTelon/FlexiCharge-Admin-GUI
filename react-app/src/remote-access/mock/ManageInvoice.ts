/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { mockInvoices } from '../../__mock-data__/invoices';
import { Invoice, IInvoice } from '../types';

export default class ManageInvoice implements IInvoice {
  invoices = mockInvoices;

  /*
  return new Promise((resolve, reject) => {
    // Look up in local
    // If not found then try remote

    setTimeout(() => {
      resolve(this.users.filter((users) => users.username === userId)[0] || null);
    }, 100);
  });
  */

  async getInvoiceByUserId(userID: string): Promise<[Invoice[] | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const arr = this.invoices.filter((object) => object.email === userID);
        
        resolve([arr, null]);
      }, 1000);
    });
  }
  async getInvoiceByDate(year?: string, month?: string, status?: string): Promise<[Invoice[] | null, any | null]> {
    return new Promise((resolve, reject) => {

      let filteredInvoices = this.invoices

      if (year) {
        filteredInvoices = filteredInvoices.filter((invoice: Invoice) => invoice.date.startsWith(year));
      }
      if (month) {
        filteredInvoices = filteredInvoices.filter((invoice: Invoice) => invoice.date.endsWith(`-${month}`));
      }

      if (status && status !== 'ALL') {
        filteredInvoices = filteredInvoices.filter((invoice: Invoice) => invoice.status === status);
      }

      setTimeout(() => {
        resolve([filteredInvoices, null]);
      }, 1000);
    });
  }
}