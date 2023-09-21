import { Charger, ICharger } from '../types';
import { mockChargers } from '@/__mock-data__';

export default class ManageCharger implements ICharger {
  chargers = mockChargers;

  public async addCharger(fields: Omit<Charger, 'chargerID' | 'status'>): Promise<[Charger | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const charger: Charger = {
          ...fields,
          chargerID: this.chargers.length + 1,
          status: 0
        };
        this.chargers.push(charger);
        resolve([charger, null]);
      }, 1000);
    });
  }

  public async getAllChargers(chargePointID?: number): Promise<[Charger[] | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([this.chargers, null]);
      }, 1000);
    });
  }

  public async getAllAvailableChargers(): Promise<[Charger[] | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([this.chargers.filter(charger => charger.status.toString() === 'available'), null]);
      }, 1000);
    });
  }

  public async getChargerById(chargerId: number): Promise<[Charger | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([this.chargers.filter((charger) => charger.chargerID === chargerId)[0] || null, null]);
      }, 100);
    });
  }

  public async updateChargerById(chargerId: number, fields: Omit<Charger, 'chargerID'>): Promise<[Charger | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const chargerIndex = this.chargers.findIndex((charger) => charger.chargerID === chargerId);
        if (chargerIndex === -1) return [null, { errorMessage: 'Could not find the requested Charger' }];

        const charger = {
          ...fields,
          chargerID: this.chargers[chargerIndex].chargerID
        };

        this.chargers[chargerIndex] = charger;
        resolve([charger, null]);
      }, 1000);
    });
  }

  public async deleteChargerById(chargerId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const chargerIndex = this.chargers.findIndex((charger) => charger.chargerID === chargerId);
        if (chargerIndex === -1) return resolve(false);

        this.chargers.splice(chargerIndex, 1);
        resolve(true);
      }, 1000);
    });
  }
}