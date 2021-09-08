import { IAuthenticationProvider } from '../interfaces';

export default class AuthenticationProvider implements IAuthenticationProvider {
  public isAuthenticated: boolean = false;

  getToken(): string | null {
    return null;
  }

  async login(username: string, password: string): Promise<[boolean, any | null]> {
    console.log(username, password);
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated = true;
      return [true, {}];
    } else {
      this.isAuthenticated = false;
      return [this.isAuthenticated, { invalidCredentials: true }];
    }
  }
}