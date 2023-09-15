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
  async getInvoiceByDate(year: string, month: string, status: string): Promise<[Invoice[] | null, any | null]> {
    return new Promise((resolve, reject) => {
      
      const fullDateFormat = `${year}-${month}`      

      setTimeout(() => {
        const arr = this.invoices.filter((object) => object.date === fullDateFormat)
        resolve([arr, null]);
      }, 1000);
    });
  }
}