import type { PublicUser } from '@todoodle-app/shared'
import type { User } from './user.schemas'

export function toPublicUser(user: User): PublicUser {
  const { password, verifiedAt, ...rest } = user

  return { ...rest, isVerified: verifiedAt !== null }
}
