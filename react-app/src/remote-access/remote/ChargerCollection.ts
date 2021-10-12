import { Charger, IChargerCollection } from '../types';
import appConfig from '@/appConfig';
import axios from 'axios';
import { authenticationProvider } from '..';

export default class ChargerCollection implements IChargerCollection {
  public async addCharger(fields: Omit<Charger, 'chargerID' | 'status'>): Promise<[Charger | null, any | null]> {
    try {
      const res = await axios.post(`${appConfig.FLEXICHARGE_API_URL}/chargers/`, fields, {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });
      return [res.data, null];
    } catch (error: any) {
      if (error.response) {
        const errorObj: any = {};
        if (error.response.data.includes('dbUniqueConstraintError')) {
          errorObj.serialNumber = 'Serial Number already exsists in system';
        } else {
          errorObj.error = 'An error occured';
        }
        return [null, errorObj];
      } else if (error.request) {
        return [null, { error: 'Could not connect to server' }];
      } else {
        return [null, {}];
      }
    }
  }

  public async getAllChargers(chargePointID?: number): Promise<[Charger[] | null, any | null]> {
    try {
      const res = await axios.get(`${appConfig.FLEXICHARGE_API_URL}/chargers`, {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });
      const chargers = res.data as Charger[];

      if (chargePointID && !isNaN(chargePointID)) {
        const filteredChargers = chargers.filter(charger => (charger.chargePointID === chargePointID));
        return [filteredChargers, null];
      } else {
        return [chargers, null];
      }
    } catch (error: any) {
      return [null, error];
    }
  }

  public async getAllAvailableChargers(): Promise<[Charger[] | null, any | null]> {
    try {
      const res = await axios.get(`${appConfig.FLEXICHARGE_API_URL}/chargers/available`, {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });
      return [res.data as Charger[], null];
    } catch (error: any) {
      return [null, error];
    }
  }

  public async getChargerById(chargerId: number): Promise<[Charger | null, any | null]> {
    try {
      const res = await axios.get(`${appConfig.FLEXICHARGE_API_URL}/chargers/${chargerId}`, {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });
      return [res.data as Charger, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  public async updateChargerById(chargerId: number, fields: Omit<Charger, 'chargerID'>): Promise<[Charger | null, any | null]> {
    try {
      const res = await axios.put(`${appConfig.FLEXICHARGE_API_URL}/chargers/${chargerId}`, fields, {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });
      return [res.data, null];
    } catch (error: any) {
      return [null, error];
    }
  }
  
  public async deleteChargerById(chargerId: number): Promise<any> {
    try {
      const res = await axios.delete(`${appConfig.FLEXICHARGE_API_URL}/chargers/${chargerId}`, {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });
      return [res.data, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}