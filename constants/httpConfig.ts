export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  CONNECT = 'CONNECT',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE',
}

export const httpError = {
  badRequest: {
    status: HttpStatusCode.BAD_REQUEST,
    message:
      'Bad Request - The request could not be understood by the server due to malformed syntax.',
  },
  unauthorized: {
    status: HttpStatusCode.UNAUTHORIZED,
    message:
      'Unauthorized - The request requires user authentication or, if the request included authorization credentials, authorization has been refused for those credentials.',
  },
  forbidden: {
    status: HttpStatusCode.FORBIDDEN,
    message: 'Forbidden - The server understood the request, but is refusing to fulfill it.',
  },
  notFound: {
    status: HttpStatusCode.NOT_FOUND,
    message: 'Not Found - The requested resource could not be found.',
  },
  tooManyRequests: {
    status: HttpStatusCode.TOO_MANY_REQUESTS,
    message: 'Too Many Requests - Rate limiting has been applied.',
  },
  internalServerError: {
    status: HttpStatusCode.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error.',
  },
  badGateway: {
    status: HttpStatusCode.BAD_GATEWAY,
    message:
      'Bad Gateway - The server was acting as a gateway or proxy and received an invalid response from the upstream server.',
  },
  serviceUnavailable: {
    status: HttpStatusCode.SERVICE_UNAVAILABLE,
    message:
      'Service Unavailable - The server is currently unable to handle the request due to a temporary condition which will be alleviated after some delay. You can choose to resend the request again.',
  },
}
