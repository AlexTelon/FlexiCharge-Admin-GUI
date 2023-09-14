export interface Invoice { 
  invoiceID: number
  email: string
  createdAt: number
  totalSum: number
  invoiceURL: string
  status?: 'PAID' | 'NOT-PAID' | 'ALL'
  date: string
}

export interface InvoiceCollection {
  email: string
  invoices: Invoice[]
}
   
export interface IInvoice {
  getInvoiceByUserId: (userId: string, status: string) => any
  getInvoiceByDate: (year: string, month: string, status: string) => any
}