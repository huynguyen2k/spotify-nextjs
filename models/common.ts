export interface HttpAuthError {
  error: string
  error_description: string
}

export interface HttpRegularError {
  error: {
    status: number
    message: string
  }
}
