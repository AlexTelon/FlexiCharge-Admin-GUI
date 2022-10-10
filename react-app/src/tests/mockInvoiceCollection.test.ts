/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import {expect, test} from '@jest/globals';
import ManageInvoiceCollection from '../remote-access/mock/ManageInvoiceCollection';

const manageInvoiceCollection = new ManageInvoiceCollection
describe("Mock invoice collection tests",() =>{
    test("Fetching Mock invoices by date correctly", async () => {
        const validSelectedDate = {
            year: '2022',
            month: '03'
        }
        const [invoices, error] = await manageInvoiceCollection.getInvoiceByDate(validSelectedDate.year, validSelectedDate.month, 'PAID');
        expect(invoices!.length).toBeGreaterThan(0)    
        for (const invoice of invoices!){
            expect(invoice.date).toEqual(validSelectedDate.year+'-'+validSelectedDate.month)
        } 
    });

    test("Fetching Mock invoices by user email correcly", async () => {
        const validUserEmail = 'jakoob@gmail.com'
        const [invoices, error] = await manageInvoiceCollection.getInvoiceByUserId(validUserEmail);
        expect(invoices!.length).toBeGreaterThan(0)    
        for (const invoice of invoices!){
            expect(invoice.email).toEqual(validUserEmail)
        } 
    });
})



 