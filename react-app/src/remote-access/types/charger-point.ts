export interface ChargePoint {
  chargePointID: number
  name: string
  location: [number, number]
  price: number
  klarnaReservationAmount: number | null
}

export interface IChargerPoint {
  getAllChargerPoints: () => Promise<ChargePoint[]>
  getChargerPointById: (chargerPointId: number) => Promise<ChargePoint | null>
  addChargerPoint: (fields: Omit<ChargePoint, 'chargePointID'>) => Promise<[number | null, any | null]>
  updateChargerPoint: (chargerPointId: number, fields: Omit<ChargePoint, 'chargePointID'>) => Promise<[ChargePoint | null, any | null]>
  deleteChargerPoint: (chargerPointId: number) => Promise<boolean>
}