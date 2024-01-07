import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './user.service'
import { UsersController } from './user.controller'
import { DeleteResult } from 'typeorm'
import { User } from './user.entity'

describe('UserController', () => {
  let usersController: UsersController
  let usersService: Pick<
    jest.MockedObject<UsersService>,
    'createUser' | 'findOne' | 'remove'
  >

  const mockUser = {
    id: 'userId',
    firstName: 'Joe',
    lastName: 'Mama',
    imageUrl: 'imageUrl'
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn()
          }
        }
      ]
    }).compile()

    usersController = app.get<UsersController>(UsersController)
    usersService = app.get(UsersService)
  })

  describe('create()', () => {
    it('should create new user', async () => {
      usersService.createUser.mockResolvedValueOnce(mockUser)
      expect(await usersController.create(mockUser)).toEqual(mockUser)
      expect(usersService.createUser).toHaveBeenCalledWith(mockUser)
    })

    it('should throw an error if user object not passed in', () => {
      expect(usersController.create({} as User)).rejects.toThrowError(
        'id is null or undefined'
      )
    })
  })

  describe('findOne()', () => {
    it('should create get me', async () => {
      usersService.findOne.mockResolvedValueOnce(mockUser)
      expect(await usersController.findOne({ id: 'userId' })).toEqual(mockUser)
      expect(usersService.findOne).toHaveBeenCalledWith('userId')
    })
  })

  describe('remove()', () => {
    it('should remove user', async () => {
      usersService.remove.mockResolvedValueOnce(
        mockUser as unknown as DeleteResult
      )
      expect(await usersController.remove({ id: 'userId' })).toEqual(mockUser)
      expect(usersService.remove).toHaveBeenCalledWith('userId')
    })

    it('should throw error with null id', () => {
      expect(usersController.remove({ id: null })).rejects.toThrowError(
        'id is null or undefined'
      )
    })
  })
})
