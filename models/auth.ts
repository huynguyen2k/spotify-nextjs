import { object, SchemaOf, string } from 'yup'

export interface TokenPayload {
  access_token: string
  expires_in: string
  token_type: string
  refresh_token: string
  scope: string
}

export const tokenPayloadSchema: SchemaOf<TokenPayload> = object({
  access_token: string().defined(),
  expires_in: string().defined(),
  token_type: string().defined(),
  refresh_token: string().defined(),
  scope: string().defined(),
})
