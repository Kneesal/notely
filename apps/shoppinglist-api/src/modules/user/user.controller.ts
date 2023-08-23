import { Body, Controller, Delete, Get, Post } from '@nestjs/common'
import { User } from './user.entity'
import { UsersService } from './user.service'
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  findOne(@Body() id: string): Promise<User> {
    return this.usersService.findOne(id)
  }

  @Post('/create-user')
  create(@Body() input: User): Promise<User> {
    return this.usersService.createUser(input)
  }

  @Delete('/remove')
  remove(@Body() id: string): Promise<DeleteResult> {
    return this.usersService.remove(id)
  }
}
