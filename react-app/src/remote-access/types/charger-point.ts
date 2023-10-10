export interface ChargerPoint {
  chargePointID: number
  name: string
  location: [number, number]
  price: number
  klarnaReservationAmount: number | null
}

export interface IChargerPoint {
  getAllChargerPoints: () => Promise<ChargerPoint[]>
  getChargerPointById: (chargerPointId: number) => Promise<ChargerPoint | null>
  addChargerPoint: (fields: Omit<ChargerPoint, 'chargePointID'>) => Promise<[number | null, any | null]>
  updateChargerPoint: (chargerPointId: number, fields: Omit<ChargerPoint, 'chargePointID'>) => Promise<[ChargerPoint | null, any | null]>
  deleteChargerPoint: (chargerPointId: number) => Promise<boolean>
}