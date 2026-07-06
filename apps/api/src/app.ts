import { Elysia } from 'elysia'

import { routes } from '@/api/routes'
import { errorHandler } from '@/api/shared/errors/error-handler'

export const app = new Elysia().use(errorHandler).use(routes)
