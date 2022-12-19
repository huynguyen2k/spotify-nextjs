import { NextApiRequest, NextApiResponse } from 'next'
import queryString from 'query-string'
import { getCookie, deleteCookie } from 'cookies-next'
import axios from 'axios'
import { STATE_KEY } from '@/constants'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string | undefined
  const state = req.query.state as string | undefined

  const storedState = getCookie(STATE_KEY, { req, res })

  if (state && storedState && state === storedState) {
    deleteCookie(STATE_KEY, { req, res })

    try {
      const response = await axios.post(
        `${process.env.SPOTIFY_AUTH_API_URL}/api/token`,
        queryString.stringify({
          code,
          redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
          grant_type: 'authorization_code',
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
    } catch (error) {
      res.redirect(
        `/login?${queryString.stringify({
          error: 'Get access and refresh tokens failed!',
        })}`
      )
    }
  } else {
    res.redirect(`/login?${queryString.stringify({ error: 'Authorize failed!' })}`)
  }
}
