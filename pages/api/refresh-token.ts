import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import queryString from 'query-string'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const refreshToken = req.query.refresh_token as string | undefined

  if (refreshToken) {
    try {
      const response = await axios.post(
        `${process.env.SPOTIFY_AUTH_API_URL}/api/token`,
        queryString.stringify({ grant_type: 'refresh_token', refresh_token: refreshToken }),
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
        message: 'Your refresh token is invalid!',
      })
    }
  } else {
    res.status(400).json({
      message: 'You are missing refresh token!',
    })
  }
}
