export interface IAuthenticationProvider {
  login: (username: string, password: string) => Promise<[boolean, any | null]>
  getToken: () => string | null
  getAdminSession: (username: string, tempPassword: string, newPassword: string) => Promise<Boolean>
  isAuthenticated: boolean
}