/**
 * Derives avatar initials from a display name, e.g. 'Anderson Silva' -> 'AS'.
 * The user model has no avatar URL, so this is the fallback for every user.
 */
export const getInitials = (name: string) => {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')
    .toUpperCase()
}
