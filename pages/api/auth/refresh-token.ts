import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import queryString from 'query-string'
import { spotifyConfig } from '@/constants'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(404).json({ error: 'Not found!' })
    return
  }

  const refreshToken = req.query.refresh_token as string | undefined

  if (refreshToken) {
    try {
      const response = await axios.post(
        `${process.env.SPOTIFY_AUTH_API_URL}/api/token`,
        queryString.stringify({
          grant_type: spotifyConfig.GRANT_TYPE.REFRESH_TOKEN,
          refresh_token: refreshToken,
        }),
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_SECRET_ID}`
            ).toString('base64')}`,
          },
        }
      )

      res.status(200).json(response.data)
    } catch (error) {
      res.status(400).json({
        error: 'Your refresh token is invalid!',
      })
    }
  } else {
    res.status(400).json({
      error: 'You are missing refresh token!',
    })
  }
}
