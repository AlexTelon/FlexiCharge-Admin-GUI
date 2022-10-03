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
      let arr: string[];
      setTimeout(() => {
        for (let i = 0; i < this.invoices.length; i++)
        {
          for (let j = 0; j < this.invoices[i].invoices.length; j++)
          {
            arr.push(this.invoices[i].invoices[j].date);
          }
        }
        console.log(arr);
        resolve([arr.filter((invoices) => invoices.date === String(year+'-'+month)), null]);
      }, 1000);
    });
  }
}