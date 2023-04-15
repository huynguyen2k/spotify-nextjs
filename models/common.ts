export interface HttpAuthError {
  error: string
  error_description: string
}

export interface HttpRegularError {
  status: number
  message: string
}
