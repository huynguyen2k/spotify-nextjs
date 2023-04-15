import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import queryString from 'query-string'
import {
  httpError,
  HttpMethod,
  HttpStatusCode,
  spotifyConfig,
  SPOTIFY_AUTH_API_URL,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_SECRET_ID,
} from '@/constants'
import { HttpAuthError } from '@/models'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== HttpMethod.GET) {
    res.status(HttpStatusCode.NOT_FOUND).json(httpError.notFound)
    return
  }

  const refreshToken = req.query.refresh_token as string | undefined

  if (refreshToken) {
    try {
      const response = await axios.post(
        `${SPOTIFY_AUTH_API_URL}/api/token`,
        queryString.stringify({
          grant_type: spotifyConfig.grantType.refreshToken,
          refresh_token: refreshToken,
        }),
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${SPOTIFY_CLIENT_ID}:${SPOTIFY_SECRET_ID}`
            ).toString('base64')}`,
          },
        }
      )
      res.status(HttpStatusCode.OK).json(response.data)
    } catch (error) {
      const unexpectedError: HttpAuthError = {
        error: 'Unexpected error.',
        error_description: 'Failed to fetch new access token.',
      }

      if (axios.isAxiosError<HttpAuthError>(error)) {
        res.status(HttpStatusCode.BAD_REQUEST).json(error.response?.data ?? unexpectedError)
        return
      }

      res.status(HttpStatusCode.BAD_REQUEST).json(unexpectedError)
    }
  } else {
    const missingRefreshTokenError: HttpAuthError = {
      error: 'Missing refresh token.',
      error_description: 'Your query params are missing refresh token.',
    }
    res.status(HttpStatusCode.BAD_REQUEST).json(missingRefreshTokenError)
  }
}
