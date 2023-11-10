import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async createUser(input: User): Promise<User> {
    const existingUser = await this.usersRepository.findOneBy({ id: input.id })

    if (existingUser != null) {
      return existingUser
    }

    const newUser = new User()
    newUser.id = input.id
    newUser.firstName = input.firstName
    newUser.lastName = input.lastName
    newUser.imageUrl = input.imageUrl
    return this.usersRepository.save(newUser)
  }

  async findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id })
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id)
  }
}
