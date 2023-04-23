import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'
import { HttpRegularError } from '@/models/common'

export const handleRegularError = (error: unknown) => {
  let errorMessage = 'Oops, something went wrong!'

  if (isAxiosError<HttpRegularError>(error) && error.response) {
    errorMessage = error.response.data.error.message
  }

  toast.error(errorMessage)
}
