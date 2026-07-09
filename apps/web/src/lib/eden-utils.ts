import type { EdenFetchError } from '@elysia/eden'

export async function unwrapEdenResponse<T>(
  promise: Promise<{ data: T; error: EdenFetchError | null }>,
  fallbackMessage: string = 'Request failed',
): Promise<T> {
  const { data, error } = await promise

  if (error) {
    throw new Error(
      typeof error.value === 'object' && error.value && 'message' in error.value
        ? (error.value as { message: string }).message
        : fallbackMessage,
    )
  }

  return data
}
