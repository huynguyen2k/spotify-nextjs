import { TokenPayload } from '@/models'

export const auth = {
  tokenKey: 'spotify_token',

  setToken(tokenPayload: TokenPayload) {
    localStorage.setItem(this.tokenKey, JSON.stringify(tokenPayload))
  },

  getToken() {
    try {
      const tokenPayload: TokenPayload = JSON.parse(localStorage.getItem(this.tokenKey) ?? '')
      return tokenPayload
    } catch (error) {
      return null
    }
  },
}
