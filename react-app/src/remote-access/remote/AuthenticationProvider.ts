/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { IAuthenticationProvider } from '../types/authentication-provider';
import { FLEXICHARGE_API_URL } from '@/appConfig';
import axios from 'axios';

export default class AuthenticationProvider implements IAuthenticationProvider {
  public isAuthenticated: boolean = false;
  private token: string | null = null;
  private username: string | null = null;
  
  getToken(): string | null {
    axios.get(`${FLEXICHARGE_API_URL}/admin/${localStorage.getItem('username')}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
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
        url: `${FLEXICHARGE_API_URL}/admin/sign-in`,
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

      localStorage.setItem('token', `${this.token}`);
      localStorage.setItem('isAuthenticated', `${this.isAuthenticated}`);
      localStorage.setItem('username', `${this.username}`);

      return [true, {}];
    } catch (error: any) {
      if(error.response.data['Session']){
        return [this.isAuthenticated, { notVerified: true }]
      } else {
        switch (error.response.status) {
        case 400:
          console.log(error.response.data)
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
  
  async getAdminSession(username: string, tempPassword: string, newPassword: string): Promise <Boolean> {
    try {
      const response = await axios({
        url: `${FLEXICHARGE_API_URL}/admin/sign-in`,
        method: 'post',
        timeout: 3000,
        data: {
          username: username,
          password: tempPassword
        }
      });
      
    } catch (error: any) {
        const [verified, errors] = await this.verifyAdmin(username, newPassword, error.response.data['Session'])
        if(verified){
          return true
        } else {
          return false
        }
    }
    return false
  }
  async verifyAdmin(username: string, newPassword: string, session: string): Promise<[boolean, any | null]> {
    try {
      const response = await axios({
        url: `${FLEXICHARGE_API_URL}/admin/force-change-password`,
        method: 'post',
        timeout: 3000,
        data: {
          username: username,
          password: newPassword,
          session: session
        }
      });

      return [true, {}];
    } catch (error: any) {
        return [this.isAuthenticated, { invalidCredentials: true }]
    }
  }
}