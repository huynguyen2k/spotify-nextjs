// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import queryString from 'query-string'
import { setCookie } from 'cookies-next'
import { randomString } from '@/utils'
import { SPOTIFY_SCOPES, STATE_KEY } from '@/constants'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const state = randomString(128)

  setCookie(STATE_KEY, state, {
    req,
    res,
    maxAge: 60 * 60, // 1 hour
    httpOnly: true,
    sameSite: 'lax',
  })

  res.redirect(
    `${process.env.SPOTIFY_AUTH_API_URL}/authorize?${queryString.stringify({
      client_id: process.env.SPOTIFY_CLIENT_ID,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
      state,
      scope: SPOTIFY_SCOPES,
      response_type: 'code',
    })}`
  )
}
