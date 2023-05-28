import { object, SchemaOf, string } from 'yup'
import moment from 'moment'
import { TokenPayload } from '@/models'

export const auth = {
  tokenKey: 'spotify_token',

  isValidTokenPayload(tokenPayload: TokenPayload) {
    const tokenPayloadSchema: SchemaOf<TokenPayload> = object({
      access_token: string().defined(),
      expires_in: string().defined(),
      token_type: string().defined(),
      refresh_token: string().defined(),
      scope: string().defined(),
    })

    return tokenPayloadSchema.isValidSync(tokenPayload, { strict: true })
  },

  setToken(tokenPayload: TokenPayload) {
    localStorage.setItem(this.tokenKey, JSON.stringify(tokenPayload))
  },

  getToken() {
    try {
      const tokenPayload: TokenPayload = JSON.parse(localStorage.getItem(this.tokenKey) ?? '')

      if (!this.isValidTokenPayload(tokenPayload)) {
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

  isLoggedIn() {
    return !!this.getToken()
  },

  isTokenExpired() {
    const token = this.getToken()

    if (!token) return false

    const currentTime = moment()
    // expired time happen before 5 minutes
    const expiredTime = moment(token.expires_in).subtract(5, 'minutes')

    return currentTime.isSameOrAfter(expiredTime)
  },
}
