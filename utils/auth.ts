import { TokenPayload, tokenPayloadSchema } from '@/models'

export const auth = {
  tokenKey: 'spotify_token',

  setToken(tokenPayload: TokenPayload) {
    localStorage.setItem(this.tokenKey, JSON.stringify(tokenPayload))
  },

  getToken() {
    try {
      const tokenPayload: TokenPayload = JSON.parse(localStorage.getItem(this.tokenKey) ?? '')

      if (!tokenPayloadSchema.isValidSync(tokenPayload)) {
        throw new Error('Failed to get data from localStorage')
      }

      return tokenPayload
    } catch (error) {
      this.clearToken()
      return null
    }
  },

  clearToken() {
    localStorage.removeItem(this.tokenKey)
  },
}
