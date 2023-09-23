/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import {expect, test} from '@jest/globals';
import ManageInvoice from '../remote-access/mock/ManageInvoice';

const manageInvoiceCollection = new ManageInvoice
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

    test("Fetching invoices by nonexistent year and month correctly", async () => {
        const nonValidDate = {
            year: '2122',
            month: '03987'
        }
        const [falseDateInvoices, error] = await manageInvoiceCollection.getInvoiceByDate(nonValidDate.year, nonValidDate.month, 'PAID');
        expect(falseDateInvoices!.length).toEqual(0)
    });

    test("Fetching invoices by nonexistent status correctly", async () => {
        const nonValidStatus = 'NOTPAID'
        const [falseStatusInvoices, error] = await manageInvoiceCollection.getInvoiceByDate('2022', '03', nonValidStatus);
        expect(falseStatusInvoices!.length).toEqual(0)
    });

    test("Fetching invoices by nonexistent year, month and status correctly", async () => {
        const nonValidDate = {
            year: '2122',
            month: '03987'
        }
        const nonValidStatus = 'NOTPAID'
        const [falseDateInvoices, error] = await manageInvoiceCollection.getInvoiceByDate(nonValidDate.year, nonValidDate.month, nonValidStatus);
        expect(falseDateInvoices!.length).toEqual(0)
    });

    test("Fetching invoices by nonexistent year and status correctly", async () => {
        const nonValidDate = {
            year: '2122',
            month: '03'
        }
        const nonValidStatus = 'NOTPAID'
        const [falseDateInvoices, error] = await manageInvoiceCollection.getInvoiceByDate(nonValidDate.year, nonValidDate.month, nonValidStatus);
        expect(falseDateInvoices!.length).toEqual(0)
    });

    test("Fetching invoices by nonexistent month and status correctly", async () => {
        const nonValidDate = {
            year: '2022',
            month: '03987'
        }
        const nonValidStatus = 'NOTPAID'
        const [falseDateInvoices, error] = await manageInvoiceCollection.getInvoiceByDate(nonValidDate.year, nonValidDate.month, nonValidStatus);
        expect(falseDateInvoices!.length).toEqual(0)
    });

    test("Fetching invoices by filtering by only year correctly", async () => {
        const validDate = {
            year: '2022',
            month: ''
        }
        const [invoices, error] = await manageInvoiceCollection.getInvoiceByDate(validDate.year, validDate.month, 'PAID');
        expect(invoices!.length).toBeGreaterThan(0)    
        for (const invoice of invoices!){
            expect(invoice.date).toContain(validDate.year)
        } 
    });

    test("Fetching invoices by filtering by only month correctly", async () => {
        const validDate = {
            year: '',
            month: '03'
        }
        const [invoices, error] = await manageInvoiceCollection.getInvoiceByDate(validDate.year, validDate.month, 'PAID');
        expect(invoices!.length).toBeGreaterThan(0)    
        for (const invoice of invoices!){
            expect(invoice.date).toContain(validDate.month)
        } 
    });

    test("Fetching invoices by filtering by only status correctly", async () => {
        const validDate = {
            year: '',
            month: ''
        }
        const [invoices, error] = await manageInvoiceCollection.getInvoiceByDate(validDate.year, validDate.month, 'PAID');
        expect(invoices!.length).toBeGreaterThan(0)    
        for (const invoice of invoices!){
            expect(invoice.status).toEqual('PAID')
        } 
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