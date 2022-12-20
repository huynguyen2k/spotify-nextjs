import type { NextApiRequest, NextApiResponse } from 'next'
import queryString from 'query-string'
import { setCookie } from 'cookies-next'
import { randomString } from '@/utils'
import { spotifyConfig } from '@/constants'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(404).json({ error: 'Not found!' })
    return
  }

  const state = randomString(128)

  setCookie(spotifyConfig.STATE_KEY, state, {
    req,
    res,
    maxAge: 60 * 60, // 1 hour (calculated by seconds)
    httpOnly: true,
    sameSite: 'lax',
  })

  res.redirect(
    `${process.env.SPOTIFY_AUTH_API_URL}/authorize?${queryString.stringify({
      client_id: process.env.SPOTIFY_CLIENT_ID,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
      state,
      scope: spotifyConfig.SCOPE,
      response_type: spotifyConfig.RESPONSE_TYPE,
    })}`
  )
}
