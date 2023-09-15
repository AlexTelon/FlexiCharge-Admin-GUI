export interface Transaction {
  transactionID: number
  isKlarnaPayment: boolean
  kwhTransfered: number
  currentChargePercentage: number
  pricePerKwh: number
  timestamp: number
  paymentID: null
  userID: number
  session_id: string
  client_token: string
  paymentConfirmed: boolean
  meterStart: null
  chargerID: number
}
  
export interface ITransaction {
  getTransactionsByUserId: (username: any) => any
}