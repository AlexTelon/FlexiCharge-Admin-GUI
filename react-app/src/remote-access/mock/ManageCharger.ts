import { type Charger, type ICharger } from '../types';
import { ChargerValidator } from '../utility/chargerUtils';
import { mockChargers } from '../../__mock-data__/chargers';

export default class ManageCharger implements ICharger {
  chargers = mockChargers;

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
        resolve([this.chargers.filter(charger => charger.status === 0), null]);
      }, 1000);
    });
  }

  public async getChargerById(connectorID: number): Promise<[Charger | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([this.chargers.filter((charger) => charger.connectorID === connectorID)[0] || null, null]);
      }, 100);
    });
  }

  public async addCharger(fields: Omit<Charger, 'connectorID' | 'status'>): Promise<[Charger | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const charger: Charger = {
          ...fields,
          connectorID: this.chargers.length + 1,
          status: 0
        };
        this.chargers.push(charger);
        resolve([charger, null]);
      }, 1000);
    });
  }

  public async updateChargerById(connectorID: number, fields: Omit<Charger, 'connectorID'>): Promise<[Charger | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const chargerIndex = this.chargers.findIndex(charger => charger.connectorID === connectorID);
        if (chargerIndex === -1) {
          resolve([null, { errorMessage: 'Could not find the requested Charger' }]);
          return;
        }

        const errorObj = ChargerValidator.validateFields(fields, this.chargers);
        if (Object.keys(errorObj).length > 0) {
          resolve([null, errorObj]);
          return;
        }

        const charger = {
          ...this.chargers[chargerIndex],
          ...fields
        };

        this.chargers[chargerIndex] = charger;
        resolve([charger, null]);
      }, 1000);
    });
  }

  public async deleteChargerById(connectorID: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const chargerIndex = this.chargers.findIndex((charger) => charger.connectorID === connectorID);
        if (chargerIndex === -1) {
          resolve(false);
          return;
        }

        this.chargers.splice(chargerIndex, 1);
        resolve(true);
      }, 1000);
    });
  }
}