import { treaty } from '@elysia/eden'

import type { App } from '@/api/app'
import { env } from '@/web/lib/env'

export const eden = treaty<App>(env.VITE_API_URL)
