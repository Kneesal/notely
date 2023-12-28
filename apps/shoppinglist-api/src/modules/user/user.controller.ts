import { Body, Controller, Delete, Get, Post } from '@nestjs/common'
import { User } from './user.entity'
import { UsersService } from './user.service'
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  findOne(@Body() input: { id: string }): Promise<User> {
    if (input['id'] == null) throw new Error('id is null or undefined')
    return this.usersService.findOne(input.id)
  }

  @Post('/create-user')
  create(@Body() input: User): Promise<User> {
    if (input['id'] == null) throw new Error('id is null or undefined')
    return this.usersService.createUser(input)
  }

  @Delete('/remove')
  remove(@Body() id: string): Promise<DeleteResult> {
    if (id['id'] == null) throw new Error('id is null or undefined')
    return this.usersService.remove(id)
  }
}
