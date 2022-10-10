/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import {expect, test} from '@jest/globals';
import ManageInvoiceCollection from '../remote-access/mock/ManageInvoiceCollection';

const manageInvoiceCollection = new ManageInvoiceCollection
describe("Fetching mock invoice collection by date tests",() =>{
    test("Fetching existing invoices by date correctly", async () => {
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

    test("Fetching invoices by nonexistent year correctly", async () => {
        const nonValidYearDate = {
            year: '2122',
            month: '03'
        }
        const [falseYearInvoices, error] = await manageInvoiceCollection.getInvoiceByDate(nonValidYearDate.year, nonValidYearDate.month, 'PAID');
        expect(falseYearInvoices!.length).toEqual(0)
    });

    test("Fetching invoices by nonexistent month correctly", async () => {
        const nonValidMonthDate = {
            year: '2022',
            month: '03987'
        }
        const [falseMonthInvoices, error] = await manageInvoiceCollection.getInvoiceByDate(nonValidMonthDate.year, nonValidMonthDate.month, 'PAID');
        expect(falseMonthInvoices!.length).toEqual(0)
    });

})

describe("Fetching mock invoice collection by user email tests",() =>{
    test("Fetching existing invoices by user email correcly", async () => {
        const validUserEmail = 'jakoob@gmail.com'
        const [invoices, error] = await manageInvoiceCollection.getInvoiceByUserId(validUserEmail);
        expect(invoices!.length).toBeGreaterThan(0)    
        for (const invoice of invoices!){
            expect(invoice.email).toEqual(validUserEmail)
        } 
    });

    test("Fetching nonexisting mock invoices by user email correcly", async () => {
        const validUserEmail = 'headcleaver69@dfgsgs.com'
        const [invoices, error] = await manageInvoiceCollection.getInvoiceByUserId(validUserEmail);
        expect(invoices!.length).toEqual(0)    
    });
}); 