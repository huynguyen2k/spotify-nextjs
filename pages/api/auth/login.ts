import { setCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'
import queryString from 'query-string'
import { randomString } from '@/utils'
import {
  httpError,
  HttpMethod,
  HttpStatusCode,
  spotifyConfig,
  SPOTIFY_AUTH_API_URL,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URL,
} from '@/constants'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== HttpMethod.GET) {
    res.status(HttpStatusCode.NOT_FOUND).json(httpError.notFound)
    return
  }

  const stringLength = 128
  const state = randomString(stringLength)
  const expiredTime = 60 * 60 // 1 hour (calculated by seconds)

  setCookie(spotifyConfig.stateKey, state, {
    req,
    res,
    maxAge: expiredTime,
    httpOnly: true,
    sameSite: 'lax',
  })

  res.redirect(
    `${SPOTIFY_AUTH_API_URL}/authorize?${queryString.stringify({
      client_id: SPOTIFY_CLIENT_ID,
      redirect_uri: SPOTIFY_REDIRECT_URL,
      state,
      scope: spotifyConfig.scope,
      response_type: spotifyConfig.responseType,
    })}`
  )
}
