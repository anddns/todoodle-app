import type { PublicUser, User } from '@/api/modules/users/user.schemas'

export function toPublicUser(user: User): PublicUser {
  const { password, verifiedAt, ...rest } = user

  return { ...rest, isVerified: verifiedAt !== null }
}
