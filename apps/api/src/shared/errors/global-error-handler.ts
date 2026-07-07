import Elysia from 'elysia'

import { AppError } from '@/api/shared/errors/app-error'
import { InfrastructureError } from '@/api/shared/errors/infrastructure-error'

export const globalErrorHandler = new Elysia({ name: 'GlobalErrorPlugin' }).onError(
  { as: 'global' },
  ({ code, error, status }) => {
    if (error instanceof AppError) {
      return status(error.statusCode, { message: error.message })
    }

    if (error instanceof InfrastructureError) {
      return status(500, { message: error.message })
    }

    if (code === 'VALIDATION') {
      return status(422, { message: 'Validation failed' })
    }

    if (code === 'NOT_FOUND') {
      return status(404, { message: 'Route not found' })
    }

    console.error(error)
    return status(500, { message: 'Internal server error' })
  },
)
