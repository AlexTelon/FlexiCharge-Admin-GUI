import { IAuthenticationProvider } from '../interfaces';

export default class AuthenticationProvider implements IAuthenticationProvider {
  public isAuthenticated: boolean = false;

  getToken(): string | null {
    return null;
  }

  async login(username: string, password: string): Promise<[boolean, any | null]> {
    return new Promise((resolve, reject) => {
      console.log(username, password);
      setTimeout(() => {
        if (username === 'admin' && password === 'admin') {
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