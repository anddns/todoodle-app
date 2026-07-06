import type {
  CreateUserInput,
  ListUsersQuery,
  PublicUser,
  UpdateUserInput,
} from '@/api/modules/users/user.schemas'
import type { IUserService } from '@/api/modules/users/user.service'
import { toPublicUser } from './user.mapper'

export interface IUserController {
  list(query: ListUsersQuery): Promise<{ data: PublicUser[]; total: number }>
  getById(id: string): Promise<PublicUser>
  create(data: CreateUserInput): Promise<PublicUser>
  update(id: string, data: UpdateUserInput): Promise<PublicUser>
  delete(id: string): Promise<void>
}

export class UserController implements IUserController {
  public constructor(private readonly service: IUserService) {}

  async list(query: ListUsersQuery): Promise<{ data: PublicUser[]; total: number }> {
    const { data, total } = await this.service.list(query)

    return {
      data: data.map(toPublicUser),
      total: total,
    }
  }

  async getById(id: string): Promise<PublicUser> {
    const user = await this.service.getById(id)

    return toPublicUser(user)
  }

  async create(data: CreateUserInput): Promise<PublicUser> {
    const user = await this.service.create(data)

    return toPublicUser(user)
  }

  async update(id: string, data: UpdateUserInput): Promise<PublicUser> {
    const user = await this.service.update(id, data)

    return toPublicUser(user)
  }

  async delete(id: string): Promise<void> {
    await this.service.delete(id)
  }
}
