export function generateUuid(): string {
  return Bun.randomUUIDv7()
}
