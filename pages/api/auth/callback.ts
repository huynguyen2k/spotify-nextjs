import { NextApiRequest, NextApiResponse } from 'next'
import queryString from 'query-string'
import { getCookie, deleteCookie } from 'cookies-next'
import axios from 'axios'
import { spotifyConfig } from '@/constants'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(404).json({ error: 'Not found!' })
    return
  }

  const code = req.query.code as string | undefined
  const state = req.query.state as string | undefined
  const error = req.query.error as string | undefined

  const storedState = getCookie(spotifyConfig.STATE_KEY, { req, res })
  deleteCookie(spotifyConfig.STATE_KEY, { req, res })

  if (error) {
    res.redirect(`/login?${queryString.stringify({ error })}`)
    return
  }

  if (state && storedState && state === storedState) {
    try {
      const response = await axios.post(
        `${process.env.SPOTIFY_AUTH_API_URL}/api/token`,
        queryString.stringify({
          code,
          redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
          grant_type: spotifyConfig.GRANT_TYPE.AUTHORIZATION_CODE,
        }),
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_SECRET_ID}`
            ).toString('base64')}`,
          },
        }
      )

      res.redirect(`/?${queryString.stringify(response.data)}`)
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
