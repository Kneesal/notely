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

    it('should create new user if not already existing in database', async () => {
      const newUser = {
        id: '1',
        firstName: 'john',
        lastName: 'Doe',
        imageUrl: 'imageURL.example'
      }

      const repoSpyFindByOne = jest
        .spyOn(repository, 'findOneBy')
        .mockResolvedValue(null)
      const repoSpySave = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(newUser)

      const result = await usersService.createUser(newUser)
      expect(result).toEqual(newUser)
      expect(repoSpyFindByOne).toHaveBeenCalledWith({ id: newUser.id })
      expect(repoSpySave).toHaveBeenCalledWith(newUser)
    })

    it('should return existing user on create if existing user exsits already', async () => {
      const newUser = {
        id: '1',
        firstName: 'john',
        lastName: 'Doe',
        imageUrl: 'imageURL.example'
      }

      const repoSpyFindByOne = jest
        .spyOn(repository, 'findOneBy')
        .mockResolvedValue(newUser)

      const result = await usersService.createUser(newUser)
      expect(result).toEqual(newUser)
      expect(repoSpyFindByOne).toHaveBeenCalledWith({ id: newUser.id })
    })

    it('should return existing user on create if existing user exsits already', async () => {
      const newUser = {
        id: '1',
        firstName: 'john',
        lastName: 'Doe',
        imageUrl: 'imageURL.example'
      }

      const repoSpyFindByOne = jest
        .spyOn(repository, 'findOneBy')
        .mockResolvedValue(newUser)

      const result = await usersService.createUser(newUser)
      expect(result).toEqual(newUser)
      expect(repoSpyFindByOne).toHaveBeenCalledWith({ id: newUser.id })
    })
  })
})
