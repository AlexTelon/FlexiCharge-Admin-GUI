/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { manageInvoice } from '../../__mock-data__/invoices';
import { ManageInvoice, IManageInvoiceCollection } from '../types';

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
  async getInvoiceByUserId(userID: string): Promise<[ManageInvoice[] | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log([this.invoices, null]);
        resolve([this.invoices, null]);
      }, 1000);
    });
  }
  async getInvoiceByDate(year: number, month: number, status: string): Promise<[ManageInvoice[] | null, any | null]> {
    return new Promise((resolve, reject) => {
      const arr = [];
      setTimeout(() => {
        for (let i = 0; i < this.invoices.length; i++)
        {
          for (let j = 0; j < this.invoices[i].invoices.length; j++)
          {
            arr.push(this.invoices[i].invoices[j]);
          }
        }
        let monthTypeConversion = ''
        if (String(month).length === 1) {
          monthTypeConversion = `0${month}`
        }
        const fullDateFormat = `${year}-${monthTypeConversion}`
        const filteredArr = arr.filter((invoice) => invoice.date === fullDateFormat);
        console.log('!!!! FILTERED ARRAY !!!!!! ', filteredArr);
        // resolve([this.invoices.filter((invoice) => invoice.date === String(year+'-'+month)), null]);
        resolve([filteredArr, null]);
      }, 1000);
    });
  }
}