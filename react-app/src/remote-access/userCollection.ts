/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ManageUser, IManageUserCollection } from './interfaces';
import appConfig from './appConfig';
import axios from 'axios';

export default class UserCollection implements IManageUserCollection {
  public async getAllUsers(): Promise<[ManageUser[] | null, any | null]> {
    try {
      const res = await axios.get(`${appConfig.FLEXICHARGE_API_URL}/users`);
      return [res.data as ManageUser[], null];
    } catch (error: any) {
      return [null, error];
    }
  }
    
  public async addUser(fields: Omit<ManageUser, 'id'>): Promise<[string | null, any | null]> {
    try {
      const res = await axios.post(`${appConfig.FLEXICHARGE_API_URL}/users/`, fields);
      return [res.data, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  public async getUserById(id: string): Promise<[ManageUser | null, any | null]> {
    try {
      const res = await axios.get(`${appConfig.FLEXICHARGE_API_URL}/users/${id}`);
      return [res.data as ManageUser, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  public async updateUser(id: string, fields: Omit<ManageUser, 'id'>): Promise<[ManageUser | null, any | null]> {
    try {
      const res = await axios.put(`${appConfig.FLEXICHARGE_API_URL}/users/${id}`, fields);
      return [res.data, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}