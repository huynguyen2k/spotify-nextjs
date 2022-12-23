export interface TokenPayload {
  access_token: string
  expires_in: number // seconds
  token_type: string
  refresh_token: string
  scope: string
}
