import { IAuthenticationProvider } from '../interfaces';

export default class AuthenticationProvider implements IAuthenticationProvider {
  public isAuthenticated: boolean = false;
  static instance = new AuthenticationProvider();

  getToken(): string | null {
    return null;
  }

  async login(username: string, password: string): Promise<boolean> {
    this.isAuthenticated = true;
    return this.isAuthenticated;
  }
}