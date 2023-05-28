import axios from 'axios'

export const axiosAuth = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosAuth.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

axiosAuth.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)
