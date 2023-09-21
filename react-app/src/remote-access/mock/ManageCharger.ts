import { Charger, ICharger } from '../types';

export default class ManageCharger implements ICharger {
  public async addCharger(fields: Omit<Charger, 'chargerID' | 'status'>): Promise<[Charger | null, any | null]> {
    // TODO
  }

  public async getAllChargers(chargePointID?: number): Promise<[Charger[] | null, any | null]> {
    // TODO
  }

  public async getAllAvailableChargers(): Promise<[Charger[] | null, any | null]> {
    // TODO
  }

  public async getChargerById(chargerId: number): Promise<[Charger | null, any | null]> {
    // TODO
  }

  public async updateChargerById(chargerId: number, fields: Omit<Charger, 'chargerID'>): Promise<[Charger | null, any | null]> {
    // TODO
  }

  public async deleteChargerById(chargerId: number): Promise<any> {
    // TODO
  }
}