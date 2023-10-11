export interface ChargePoint {
  chargePointID: number
  name: string
  location: [number, number]
  price: number
  klarnaReservationAmount: number | null
}

export interface IChargerPoint {
  getAllChargerPoints: () => Promise<ChargePoint[]>
  getChargerPointById: (chargePointId: number) => Promise<ChargePoint | null>
  addChargerPoint: (fields: Omit<ChargePoint, 'chargePointID'>) => Promise<[number | null, any | null]>
  updateChargerPoint: (chargePointId: number, fields: Omit<ChargePoint, 'chargePointID'>) => Promise<[ChargePoint | null, any | null]>
  deleteChargerPoint: (chargePointId: number) => Promise<boolean>
}