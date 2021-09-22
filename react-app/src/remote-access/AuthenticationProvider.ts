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
      const response = await axios({
        url: 'http://54.220.194.65:8080/auth/admin/sign-in',
        method: 'post',
        timeout: 3000,
        data: {
          username,
          password
        }
      });
      
      this.token = response.data.accessToken;
      this.isAuthenticated = true;
      return [true, {}];
    } catch (error: any) {
      console.log('error', error.request);
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