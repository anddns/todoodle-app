import type { CurrentUser } from '../types'

/**
 * Stubbed session lookup.
 *
 * The API has no session or `/me` endpoint yet, and `PublicUser` carries no
 * avatar field. Once auth lands, replace this body with the Eden call and the
 * rest of the app keeps working unchanged.
 */
export const fetchCurrentUser = async (): Promise<CurrentUser> => {
  return {
    name: 'Anderson Silva',
    email: 'anddns92@gmail.com',
    avatarUrl: null,
  }
}
