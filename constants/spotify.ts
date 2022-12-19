export const SPOTIFY_SCOPES = [
  // images
  'ugc-image-upload',
  // spotify connect
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  // playback
  'app-remote-control',
  'streaming',
  // playlists
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
  // follow
  'user-follow-modify',
  'user-follow-read',
  // listening history
  'user-read-playback-position',
  'user-top-read',
  'user-read-recently-played',
  // library
  'user-library-modify',
  'user-library-read',
  // users
  'user-read-email',
  'user-read-private',
].join(' ')

export const STATE_KEY = 'spotify_auth_state'
