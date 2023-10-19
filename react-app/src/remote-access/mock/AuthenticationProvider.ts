import { type IAuthenticationProvider } from '../types';
import { loginInfo } from '../../__mock-data__';

export default class AuthenticationProvider implements IAuthenticationProvider {
  public isAuthenticated: boolean = false;

  async getToken(): Promise<string | null> {
    return null;
    // Todo!
  }

  async login(username: string, password: string): Promise<[boolean, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === loginInfo.username && password === loginInfo.password) {
          this.isAuthenticated = true;
          sessionStorage.setItem('isAuthenticated', 'true');
          resolve([true, {}]);
        } else {
          this.isAuthenticated = false;
          resolve([this.isAuthenticated, { invalidCredentials: true }]);
        }
      }, 3000);
    });
  }

  async getAdminSession(username: string, tempPassword: string, newPassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === loginInfo.username && tempPassword === loginInfo.password) {
          this.isAuthenticated = true;
          resolve(true);
        } else {
          this.isAuthenticated = false;
          resolve(false);
        }
      }, 3000);
    });
  }

  logout(): void {
    this.isAuthenticated = false;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('username');
    location.reload();
  }
}