import { type ChargePoint } from '../remote-access/types';

export const mockChargerPoints: ChargePoint[] = [
  { chargePointID: 1, name: 'University Point', location: [57.7788187, 14.1621992], price: 20, klarnaReservationAmount: 800 },
  { chargePointID: 2, name: 'McDonalds Point', location: [57.7624059, 14.1499653], price: 20, klarnaReservationAmount: 800 },
  { chargePointID: 3, name: 'Asect Point', location: [57.7718868, 14.2020042], price: 20, klarnaReservationAmount: 800 }
];