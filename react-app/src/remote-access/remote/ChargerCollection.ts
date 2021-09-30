import { Charger, IChargerCollection } from '../types';
import appConfig from '@/appConfig';
import axios from 'axios';

export default class ChargerCollection implements IChargerCollection {
  public async addCharger(fields: Omit<Charger, 'chargerID'>): Promise<[Charger | null, any | null]> {
    try {
      const res = await axios.post(`${appConfig.FLEXICHARGE_API_URL}/chargers/`, fields);
      return [res.data, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  public async getAllChargers(): Promise<[Charger[] | null, any | null]> {
    try {
      const res = await axios.get(`${appConfig.FLEXICHARGE_API_URL}/chargers`);
      return [res.data as Charger[], null];
    } catch (error: any) {
      return [null, error];
    }
  }

  public async getAllAvailableChargers(): Promise<[Charger[] | null, any | null]> {
    try {
      const res = await axios.get(`${appConfig.FLEXICHARGE_API_URL}/chargers/available`);
      return [res.data as Charger[], null];
    } catch (error: any) {
      return [null, error];
    }
  }

  public async getChargerById(chargerId: number): Promise<[Charger | null, any | null]> {
    try {
      const res = await axios.get(`${appConfig.FLEXICHARGE_API_URL}/chargers/${chargerId}`);
      return [res.data as Charger, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  public async updateChargerById(chargerId: number, fields: Omit<Charger, 'chargerID'>): Promise<[Charger | null, any | null]> {
    try {
      const res = await axios.put(`${appConfig.FLEXICHARGE_API_URL}/chargers/${chargerId}`, fields);
      return [res.data, null];
    } catch (error: any) {
      return [null, error];
    }
  }
  
  public async deleteChargerById(chargerId: number): Promise<any> {
    try {
      const res = await axios.delete(`${appConfig.FLEXICHARGE_API_URL}/chargers/${chargerId}`);
      return [res.data, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}