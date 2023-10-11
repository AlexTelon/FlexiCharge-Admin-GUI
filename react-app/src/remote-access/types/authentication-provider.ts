export interface IAuthenticationProvider {
  login: (username: string, password: string) => Promise<[boolean, any | null]>
  getToken: () => Promise<string | null>
  getAdminSession: (username: string, tempPassword: string, newPassword: string) => Promise<boolean>
  isAuthenticated: boolean
  logout: () => void
}