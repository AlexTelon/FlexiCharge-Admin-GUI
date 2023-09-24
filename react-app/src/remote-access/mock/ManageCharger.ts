import { Charger, ICharger } from '../types';
import { mockChargers } from '../../__mock-data__/chargers';

export default class ManageCharger implements ICharger {
  chargers = mockChargers;

  async getAllChargers(chargePointID?: number): Promise<[Charger[] | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([this.chargers, null]);
      }, 1000);
    });
  }

  async getAllAvailableChargers(): Promise<[Charger[] | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([this.chargers.filter(charger => charger.status === 0), null]);
      }, 1000);
    });
  }

  async getChargerById(chargerId: number): Promise<[Charger | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([this.chargers.filter((charger) => charger.chargerID === chargerId)[0] || null, null]);
      }, 100);
    });
  }

  async addCharger(fields: Omit<Charger, 'chargerID' | 'status'>): Promise<[Charger | null, any | null]> {
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

  async updateChargerById(chargerId: number, fields: Omit<Charger, 'chargerID'>): Promise<[Charger | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const chargerIndex = this.chargers.findIndex((charger) => charger.chargerID === chargerId);
        if (chargerIndex === -1) return [null, { errorMessage: 'Could not find the requested Charger' }];

        const errorObj = this.validateFields(fields);
        if (Object.keys(errorObj).length > 0) resolve([null, errorObj]);

        const charger = {
          ...fields,
          chargerID: this.chargers[chargerIndex].chargerID
        };

        this.chargers[chargerIndex] = charger;
        resolve([charger, null]);
      }, 1000);
    });
  }

  async deleteChargerById(chargerId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const chargerIndex = this.chargers.findIndex((charger) => charger.chargerID === chargerId);
        if (chargerIndex === -1) return resolve(false);

        this.chargers.splice(chargerIndex, 1);
        resolve(true);
      }, 1000);
    });
  }

  private isNametaken(name: string) {
    for (const charger of this.chargers) {
      if (charger.serialNumber === name) return true;
    }
    return false;
  }

  private isValidLatitude(latitude: string) {
    const lat = parseFloat(latitude);
    return lat >= -90 && lat <= 90;
  }

  private isValidLongitude(longitude: string) {
    const lon = parseFloat(longitude);
    return lon >= -180 && lon <= 80;
  }

  private validateFields(fields: Omit<Charger, 'chargePointID'>): any | null {
    const errorObj: any = {};
    if (fields.location[0] && ((fields.location[0]) || !this.isValidLatitude(fields.location[1]))) {
      errorObj.latitude = 'Latitude must be a number within range -90 to 90';
    }
    if (fields.location[1] && ((fields.location[1]) || !this.isValidLongitude(fields.location[0]))) {
      errorObj.longitude = 'Longitude must be a number within range -180 to 80';
    }
    if (fields.chargerID && this.isNametaken(fields.chargerID.toString())) errorObj.name = 'Name is taken';
    return errorObj;
  }
}