export interface UserProfile {
  id: string
  country: string
  display_name: string | null
  email: string
  href: string
  product: string
  type: string
  uri: string
  explicit_content: {
    filter_enabled: boolean
    filter_locked: boolean
  }
  external_urls: {
    spotify: string
  }
  followers: {
    href: string | null
    total: number
  }
  images: Array<{
    url: string
    height: number
    width: number
  }>
}
