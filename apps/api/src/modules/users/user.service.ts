import type { IUserRepository } from '@/api/modules/users/user.repository'
import type {
  CreateUserInput,
  ListUsersQuery,
  UpdateUserInput,
  User,
} from '@/api/modules/users/user.schemas'
import { ConflictError, NotFoundError } from '@/api/shared/errors/app-error'
import { hashPassword } from '@/api/shared/security/password-hasher'

export interface IUserService {
  list(query: ListUsersQuery): Promise<{ data: User[]; total: number }>
  getById(id: string): Promise<User>
  create(input: CreateUserInput): Promise<User>
  update(id: string, data: UpdateUserInput): Promise<User>
  delete(id: string): Promise<void>
}

export class UserService implements IUserService {
  public constructor(private readonly repository: IUserRepository) {}

  async list(query: ListUsersQuery): Promise<{ data: User[]; total: number }> {
    return await this.repository.findAll(query)
  }

  async getById(id: string): Promise<User> {
    const user = await this.repository.findById(id)

    if (!user) throw new NotFoundError(`User ${id} not found`)

    return user
  }

  async create(input: CreateUserInput): Promise<User> {
    const alreadyExists = await this.repository.findByEmail(input.email)

    if (alreadyExists) throw new ConflictError(`Email '${alreadyExists.email}' is already in use`)

    const hashedPassword = await hashPassword(input.password)

    return this.repository.create({ ...input, password: hashedPassword })
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
    if (data.email) {
      const emailAlreadyInUse = await this.repository.findById(data.email)

      if (emailAlreadyInUse) throw new ConflictError(`Email '${data.email}' already in use`)
    }

    if (data.password) data.password = await hashPassword(data.password)

    const user = await this.repository.update(id, data)

    if (!user) throw new NotFoundError(`User ${id} not found`)

    return user
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repository.delete(id)

    if (!deleted) throw new NotFoundError(`User ${id} not found`)
  }
}
