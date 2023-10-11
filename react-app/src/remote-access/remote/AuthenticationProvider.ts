/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { IAuthenticationProvider } from '@/remote-access/types';
import { FLEXICHARGE_API_URL } from '@/appConfig';
import axiosInstance from '../utility/axios-instance';

export default class AuthenticationProvider implements IAuthenticationProvider {
  public isAuthenticated: boolean = false;
  private token: string | null = null;
  private username: string | null = null;
  
  async getToken(): Promise<string | null> {
    try {
      const response = await axiosInstance.get(`${FLEXICHARGE_API_URL}/admin/${sessionStorage.getItem('username')}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      // Assuming API returns the token
      this.token = response.data.token; 
      return this.token;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        this.isAuthenticated = false;
        this.token = null;
        this.username = null;
      }
      return null;
    }
  }  

  async login(username: string, password: string): Promise<[boolean, any | null]> {
    try {
      const response = await axiosInstance({
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

      sessionStorage.setItem('token', `${this.token}`);
      sessionStorage.setItem('isAuthenticated', `${this.isAuthenticated}`);
      sessionStorage.setItem('username', `${this.username}`);

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
  
  async getAdminSession(username: string, tempPassword: string, newPassword: string): Promise <boolean> {
    try {
      const response = await axiosInstance({
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
      const response = await axiosInstance({
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

  logout(): void {
    this.isAuthenticated = false;
    this.token = null;
    this.username = null;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('username');
    location.reload();
  }
}