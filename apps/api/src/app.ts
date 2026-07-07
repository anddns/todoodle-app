import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'
import { routes } from '@/api/routes'

import { globalErrorHandler } from '@/api/shared/errors/global-error-handler'

export const app = new Elysia().use(globalErrorHandler).use(cors()).use(routes)
