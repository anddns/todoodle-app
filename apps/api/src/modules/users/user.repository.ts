import { asc, count, desc, eq, isNotNull, isNull } from 'drizzle-orm'

import type {
  CreateUserInput,
  ListUsersQuery,
  UpdateUserInput,
  User,
} from '@/api/modules/users/user.schemas'
import type { DrizzleDatabase } from '@/api/shared/database'
import { usersTable } from '@/api/shared/database/schema/users.table'
import { DatabaseError } from '@/api/shared/errors/infrastructure-error'

export type IUserRepository = {
  findAll(query: ListUsersQuery): Promise<{ data: User[]; total: number }>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: CreateUserInput): Promise<User>
  update(id: string, data: UpdateUserInput): Promise<User | null>
  delete(id: string): Promise<boolean>
  reset(): Promise<boolean>
}

export class UserRepository implements IUserRepository {
  public constructor(private readonly database: DrizzleDatabase) {}

  async findAll(query: ListUsersQuery): Promise<{ data: User[]; total: number }> {
    const { status, sortBy, sortOrder, limit, offset } = query

    const whereClause =
      status === 'unverified'
        ? isNull(usersTable.verifiedAt)
        : status === 'verified'
          ? isNotNull(usersTable.verifiedAt)
          : undefined

    const orderColumn =
      sortBy === 'name'
        ? usersTable.name
        : sortBy === 'email'
          ? usersTable.email
          : sortBy === 'verifiedAt'
            ? usersTable.verifiedAt
            : usersTable.createdAt

    const orderClause = sortOrder === 'asc' ? asc(orderColumn) : desc(orderColumn)

    const [data, totalResult] = await Promise.all([
      this.database
        .select()
        .from(usersTable)
        .where(whereClause)
        .orderBy(orderClause)
        .limit(limit)
        .offset(offset),
      this.database.select({ total: count() }).from(usersTable).where(whereClause),
    ])

    return { data, total: totalResult[0] ? totalResult[0].total : 0 }
  }

  async findById(id: string): Promise<User | null> {
    const [user] = await this.database
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))

    return user ?? null
  }

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await this.database
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))

    return user ?? null
  }

  async create(data: CreateUserInput): Promise<User> {
    const [user] = await this.database.insert(usersTable).values(data).returning()

    if (!user) throw new DatabaseError(`Database error: Failed to create user record`)

    return user
  }

  async update(id: string, data: UpdateUserInput): Promise<User | null> {
    const [user] = await this.database
      .update(usersTable)
      .set(data)
      .where(eq(usersTable.id, id))
      .returning()

    return user ?? null
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.database
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning({ id: usersTable.id })

    return result.length > 0
  }

  async reset(): Promise<boolean> {
    const result = await this.database.delete(usersTable).returning()

    return result.length > 0
  }
}
