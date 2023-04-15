import { NextApiRequest, NextApiResponse } from 'next'
import queryString from 'query-string'
import { getCookie, deleteCookie } from 'cookies-next'
import axios from 'axios'
import {
  httpError,
  HttpMethod,
  HttpStatusCode,
  spotifyConfig,
  SPOTIFY_AUTH_API_URL,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URL,
  SPOTIFY_SECRET_ID,
} from '@/constants'
import { HttpAuthError } from '@/models'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== HttpMethod.GET) {
    res.status(HttpStatusCode.NOT_FOUND).json(httpError.notFound)
    return
  }

  const code = req.query.code as string | undefined
  const state = req.query.state as string | undefined
  const error = req.query.error as string | undefined

  const storedState = getCookie(spotifyConfig.stateKey, { req, res })
  deleteCookie(spotifyConfig.stateKey, { req, res })

  if (error) {
    const unauthorizedError: HttpAuthError = {
      error: 'Unauthorized error.',
      error_description: error,
    }
    res.redirect(`/login?${queryString.stringify(unauthorizedError)}`)
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
    } catch (httpError) {
      const unexpectedError: HttpAuthError = {
        error: 'Unexpected error.',
        error_description: 'Failed to fetch access token.',
      }

      if (axios.isAxiosError<HttpAuthError>(httpError)) {
        res.redirect(`/login?${queryString.stringify(httpError.response?.data ?? unexpectedError)}`)
        return
      }

      res.redirect(`/login?${queryString.stringify(unexpectedError)}`)
    }
  } else {
    const stateError: HttpAuthError = {
      error: 'Mismatch state.',
      error_description:
        'The state that you requested to login with your current state is not match.',
    }
    res.redirect(`/login?${queryString.stringify(stateError)}`)
  }
}
