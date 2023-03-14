import { NextApiRequest, NextApiResponse } from 'next'
import queryString from 'query-string'
import { getCookie, deleteCookie } from 'cookies-next'
import axios from 'axios'
import {
  spotifyConfig,
  SPOTIFY_AUTH_API_URL,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URL,
  SPOTIFY_SECRET_ID,
} from '@/constants'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(404).json({ error: 'Not found!' })
    return
  }

  const code = req.query.code as string | undefined
  const state = req.query.state as string | undefined
  const error = req.query.error as string | undefined

  const storedState = getCookie(spotifyConfig.stateKey, { req, res })
  deleteCookie(spotifyConfig.stateKey, { req, res })

  if (error) {
    res.redirect(`/login?${queryString.stringify({ error })}`)
    return
  }

  if (state && storedState && state === storedState) {
    try {
      const response = await axios.post(
        `${SPOTIFY_AUTH_API_URL}/api/token`,
        queryString.stringify({
          code,
          redirect_uri: SPOTIFY_REDIRECT_URL,
          grant_type: spotifyConfig.grantType.authorizationCode,
        }),
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${SPOTIFY_CLIENT_ID}:${SPOTIFY_SECRET_ID}`
            ).toString('base64')}`,
          },
        }
      )

      res.redirect(`/login?${queryString.stringify(response.data)}`)
    } catch (catchError) {
      res.redirect(
        `/login?${queryString.stringify({
          error: 'Get access and refresh tokens failed!',
        })}`
      )
    }
  } else {
    res.redirect(`/login?${queryString.stringify({ error: 'Mismatch state!' })}`)
  }
}
