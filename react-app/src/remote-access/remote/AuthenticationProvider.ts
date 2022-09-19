/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { IAuthenticationProvider } from '../types/authentication-provider';
import { FLEXICHARGE_API_URL } from '@/appConfig';
import axios from 'axios';

export default class AuthenticationProvider implements IAuthenticationProvider {
  public isAuthenticated: boolean = false;
  private token: string | null = null;
  private username: string | null = null;
  
  getToken(): string | null {
    axios.get(`${FLEXICHARGE_API_URL}/auth/admin/${this.username}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).catch((error) => {
      if (error.response && error.response.status === 401) {
        location.reload();
      }
    });
    return this.token;
  }

  async login(username: string, password: string): Promise<[boolean, any | null]> {
    try {
      const response = await axios({
        url: `${FLEXICHARGE_API_URL}/auth/admin/sign-in`,
        method: 'post',
        timeout: 3000,
        data: {
          username,
          password
        }
      });
      
      this.token = response.data.accessToken;
      this.username = response.data.username;
      this.isAuthenticated = true;
      return [true, {}];
    } catch (error: any) {
      switch (error.response.status) {
        case 400:
          this.isAuthenticated = false;
          return [this.isAuthenticated, { invalidCredentials: true }];
        case 403:
          this.isAuthenticated = false;
          return [this.isAuthenticated, { unauthorized: true }];
        default:
          this.isAuthenticated = false;
          return [false, { unknownError: true }];
      } 
    }
  }
}