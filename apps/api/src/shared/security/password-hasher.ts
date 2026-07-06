export async function hashPassword(plainTextPassword: string): Promise<string> {
  return Bun.password.hash(plainTextPassword, {
    algorithm: 'argon2id',
    memoryCost: 19456,
    timeCost: 2,
  })
}

export async function verifyPassword(
  plainTextPassword: string,
  passwordHash: string,
): Promise<boolean> {
  return Bun.password.verify(plainTextPassword, passwordHash)
}
