/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { manageInvoice } from '../../__mock-data__/invoices';
import { Invoice, IManageInvoiceCollection } from '../types';

export default class ManageInvoiceCollection implements IManageInvoiceCollection {
  invoices = manageInvoice;

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
        console.log([this.invoices, null]);
        resolve([this.invoices, null]);
      }, 1000);
    });
  }
  async getInvoiceByDate(year: number, month: number, status: string): Promise<[Invoice[] | null, any | null]> {
    return new Promise((resolve, reject) => {
      let monthTypeConversion = ''

      if (String(month).length === 1) {
        monthTypeConversion = `0${month}`
      }

      const fullDateFormat = `${year}-${monthTypeConversion}`      
      console.log('before filter ', this.invoices);

      setTimeout(() => {
        const arr = this.invoices.filter((object) => object.date === fullDateFormat)

        console.log('after filter ', arr);
        resolve([arr, null]);
      }, 1000);
    });
  }
}