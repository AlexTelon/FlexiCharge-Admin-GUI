export interface IAuthenticationProvider {
  login: (username: string, password: string) => Promise<[boolean, any | null]>
  getAdminSession: (username: string, tempPassword: string, newPassword: string) => Promise <boolean>
  isAuthenticated: boolean
}