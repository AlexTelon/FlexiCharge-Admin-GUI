import { IAuthenticationProvider } from './interfaces';
import axios from 'axios';

export default class AuthenticationProvider implements IAuthenticationProvider {
  public isAuthenticated: boolean = false;
  private token: string | null = null;
  
  getToken(): string | null {
    return this.token;
  }

  async login(username: string, password: string): Promise<[boolean, any | null]> {
    try {
      const result = await axios.post('http://54.220.194.65:8080/admin/sign-in', {
        timeout: 3000,
        data: {
          username,
          password
        }
      });
      
      switch (result.status) {
        case 200:
          this.token = result.data.accessToken;
          this.isAuthenticated = true;
          return [true, {}];
        case 400:
          this.isAuthenticated = false;
          return [this.isAuthenticated, { invalidCredentials: true }];
        case 403:
          this.isAuthenticated = false;
          return [this.isAuthenticated, { unauthorized: true }];
        default:
          this.isAuthenticated = false;
          return [this.isAuthenticated, { unknownError: true }];
      }
    } catch (e) {
      return [false, { unknownError: true }];
    }
  }
}