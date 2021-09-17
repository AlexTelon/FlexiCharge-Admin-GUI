import { IAuthenticationProvider } from '../interfaces';
import { loginInfo } from '../../__mock-data__';

export default class AuthenticationProvider implements IAuthenticationProvider {
  public isAuthenticated: boolean = false;

  getToken(): string | null {
    return null;
  }

  async login(username: string, password: string): Promise<[boolean, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === loginInfo.username && password === loginInfo.password) {
          this.isAuthenticated = true;
          resolve([true, {}]);
        } else {
          this.isAuthenticated = false;
          resolve([this.isAuthenticated, { invalidCredentials: true }]);
        }
      }, 3000);
    });
  }
}