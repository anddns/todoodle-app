import Elysia from 'elysia'

import { AppError } from '@/api/shared/errors/app-error'

export const errorHandler = new Elysia().onError(({ code, error, status }) => {
  if (error instanceof AppError) {
    return status(error.statusCode, { message: error.message })
  }

  if (code === 'VALIDATION') {
    return status(422, { message: 'Validation failed' })
  }

  if (code === 'NOT_FOUND') {
    return status(404, { message: 'Route not found' })
  }

  console.error(error)
  return status(500, { message: 'Internal server error' })
})
