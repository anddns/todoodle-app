import { app } from '@/api/app'
import { env } from '@/api/shared/settings/env'

app.listen(env.PORT)

console.log(`Server running on http://${app.server?.hostname}:${app.server?.port}`)
