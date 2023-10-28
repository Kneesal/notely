import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './user.service'
import { UsersController } from './user.controller'
import { DeleteResult } from 'typeorm'

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
  })

  describe('findOne()', () => {
    it('should create get me', async () => {
      usersService.findOne.mockResolvedValueOnce(mockUser)
      expect(await usersController.findOne('userId')).toEqual(mockUser)
      expect(usersService.findOne).toHaveBeenCalledWith('userId')
    })
  })

  describe('remove()', () => {
    it('should remove user', async () => {
      usersService.remove.mockResolvedValueOnce(
        mockUser as unknown as DeleteResult
      )
      expect(await usersService.remove('userId')).toEqual(mockUser)
      expect(usersService.remove).toHaveBeenCalledWith('userId')
    })
  })
})
