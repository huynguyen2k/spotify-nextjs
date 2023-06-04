import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'
import { number, object, SchemaOf, string } from 'yup'
import { HttpRegularError, HttpAuthError } from '@/models/common'

export function isHttpRegularError(error: unknown): error is HttpRegularError {
  const errorSchema: SchemaOf<HttpRegularError> = object({
    error: object({
      status: number().defined(),
      message: string().defined(),
    }).defined(),
  })

  return errorSchema.isValidSync(error, { strict: true })
}

export function isHttpAuthError(error: unknown): error is HttpAuthError {
  const errorSchema: SchemaOf<HttpAuthError> = object({
    error: string().defined(),
    error_description: string().defined(),
  })

  return errorSchema.isValidSync(error, { strict: true })
}

export function handleAxiosError(error: unknown) {
  if (!isAxiosError(error) || !error.response) {
    const errorMessage = 'Oops, something went wrong!'
    toast.error(errorMessage)
    return
  }

  const axiosError = error.response.data

  if (isHttpRegularError(axiosError)) {
    toast.error(axiosError.error.message)
    return
  }

  if (isHttpAuthError(axiosError)) {
    toast.error(`${axiosError.error}: ${axiosError.error_description}`)
  }
}
