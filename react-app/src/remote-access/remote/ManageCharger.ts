import { Charger, ICharger } from '../types';
import { FLEXICHARGE_API_URL } from '@/appConfig';
import axios from 'axios';

export default class ManageCharger implements ICharger {
  public async addCharger(fields: Omit<Charger, 'chargerID' | 'status'>): Promise<[Charger | null, any | null]> {
    try {
      const res = await axios.post(`${FLEXICHARGE_API_URL}/chargers/`, fields, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
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
      const res = await axios.get(`${FLEXICHARGE_API_URL}/chargers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
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
      const res = await axios.get(`${FLEXICHARGE_API_URL}/chargers/available`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return [res.data as Charger[], null];
    } catch (error: any) {
      return [null, error];
    }
  }

  public async getChargerById(chargerId: number): Promise<[Charger | null, any | null]> {
    try {
      const res = await axios.get(`${FLEXICHARGE_API_URL}/chargers/${chargerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return [res.data as Charger, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  public async updateChargerById(chargerId: number, fields: Omit<Charger, 'chargerID'>): Promise<[Charger | null, any | null]> {
    try {
      const res = await axios.put(`${FLEXICHARGE_API_URL}/chargers/${chargerId}`, fields, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return [res.data, null];
    } catch (error: any) {
      return [null, error];
    }
  }
  
  public async deleteChargerById(chargerId: number): Promise<any> {
    try {
      const res = await axios.delete(`${FLEXICHARGE_API_URL}/chargers/${chargerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return [res.data, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}