import { FLEXICHARGE_API_URL } from '@/appConfig';
import { mockChargerStations } from '@/__mock-data__';
import axios from 'axios';
import { type ChargerStation, type IChargerStation } from '../types';

export default class ManageChargerStation implements IChargerStation {
  stations = mockChargerStations;

  async getAllChargerStations(): Promise<ChargerStation[]> {
    const response = await axios.get(`${FLEXICHARGE_API_URL}/chargePoints`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    const chargerStations = response.data;
    return chargerStations;
  }

  async getChargerStationById(stationId: number): Promise<ChargerStation | null> {
    try {
      const reponse = await axios.get(`${FLEXICHARGE_API_URL}/chargePoints/${stationId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const chargerStation = reponse.data;
      return chargerStation;
    } catch (error: any) {
      if (error.response) {
        return null;
      }
      return null;
    }
  }

  async addChargerStation(fields: Omit<ChargerStation, 'chargePointID'>): Promise<[number | null, any | null]> {
    console.log('addChargerStation');
    try {
      console.log('addChargerStation - validating fields:', fields);
      const errorObj = this.validateFields(fields);
      console.log('addChargerStation - validation errorObj:', errorObj);
      if (Object.keys(errorObj).length > 0) {
        console.log('addChargerStation - validation failed');
        return [null, errorObj];
      }

      console.log('addChargerStation - sending POST request');
      const response = await axios.post(`${FLEXICHARGE_API_URL}/chargePoints`, {
        ...fields
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('addChargerStation - response received:', response);

      if (response.status === 201) {
        console.log('addChargerStation - charge point added successfully:', response.data);
        return [response.data, null];
      }

      console.log('addChargerStation - unexpected response status:', response.status);
      return [null, { error: 'An error occured' }];
    } catch (error: any) {
      console.error('addChargerStation - caught error:', error);
      if (error.response) {
        const errorObj: any = {};
        console.error('addChargerStation - error response:', error.response.data);
        if (typeof error.response.data === 'string' && error.response.data.includes('dbUniqueConstraintError')) {
          errorObj.name = 'Name is taken';
        } else if (error.response.data && typeof error.response.data === 'object' && error.response.data.message) {
          console.error('addChargerStation - error message:', error.response.data.message);
          errorObj.error = error.response.data.message;
        } else {
          errorObj.error = 'An error occured';
        }
        return [null, errorObj];
      } else if (error.request) {
        console.error('addChargerStation - no response received:', error.request);
        return [null, { error: 'Could not connect to server' }];
      } else {
        console.error('addChargerStation - error during request setup:', error.message);
        return [null, {}];
      }
    }
  }

  async deleteChargerStation(stationId: number): Promise<boolean> {
    try {
      const response = await axios.delete(`${FLEXICHARGE_API_URL}/chargePoints/${stationId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 204) {
        return true;
      }
      return false;
    } catch (error: any) {
      if (error.response) {
        return false;
      }
      return false;
    }
  }

  async updateChargerStation(stationId: number, fields: Omit<ChargerStation, 'chargePointID'>): Promise<[ChargerStation | null, any | null]> {
    try {
      const errorObj = this.validateFields(fields);
      if (Object.keys(errorObj).length > 0) return [null, errorObj];

      const response = await axios.put(`${FLEXICHARGE_API_URL}/chargePoints/${stationId}`, {
        ...fields
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        return [response.data, null];
      }

      return [null, { error: 'An error occured' }];
    } catch (error: any) {
      if (error.response) {
        const errorObj: any = {};
        if (error.response.data.includes('dbUniqueConstraintError')) {
          errorObj.name = 'Name is taken';
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
  
  private isValidLatitude(latitude: number) {
    return latitude >= -90 && latitude <= 90;
  }

  private isValidLongitude(longitude: number) {
    return longitude >= -180 && longitude <= 180;
  }

  private validateFields(fields: Omit<ChargerStation, 'chargePointID'>): any | null {
    const errorObj: any = {};
    if (!Array.isArray(fields.location) || fields.location.length < 2) {
      errorObj.location = 'Location must be an array with at least two elements (latitude and longitude)';
      return errorObj;
    }

    if (fields.location[0] == null || isNaN(fields.location[0]) || !this.isValidLatitude(fields.location[0])) {
      errorObj.latitude = 'Latitude must be a number and within range -90 to 90';
    }
    if (fields.location[1] == null || isNaN(fields.location[1]) || !this.isValidLongitude(fields.location[1])) {
      errorObj.longitude = 'Longitude must be a number and within range -180 to 180';
    }
    return errorObj;
  }
}