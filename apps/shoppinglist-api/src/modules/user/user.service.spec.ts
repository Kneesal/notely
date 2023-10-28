import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './user.service'
import { Repository } from 'typeorm/repository/Repository'
import { User } from './user.entity'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('UserController', () => {
  let usersService: UsersService
  let repository: Repository<User>

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository
        }
      ]
    }).compile()

    usersService = app.get(UsersService)
    repository = app.get<Repository<User>>(getRepositoryToken(User))
  })

  it('should be defined', () => {
    expect(usersService).toBeDefined()
  })

  describe('findOne()', () => {
    it('should find one user by id', async () => {
      const expectedResult = new User() // Create a sample entity
      const repoSpy = jest
        .spyOn(repository, 'findOneBy')
        .mockResolvedValue(expectedResult)
      const entityId = '1'
      const result = await usersService.findOne(entityId)
      expect(result).toEqual(expectedResult)
      expect(repoSpy).toHaveBeenCalledWith({ id: entityId })
    })
  })
})
