export interface IAuthenticationProvider {
  login: (username: string, password: string) => Promise<boolean>
  getToken: () => string | null
  isAuthenticated: boolean
}