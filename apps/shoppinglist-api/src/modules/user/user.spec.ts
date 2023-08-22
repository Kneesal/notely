import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './user.service'
import { UsersController } from './user.controller'
// import { getRepositoryToken } from '@nestjs/typeorm'
// import { User } from './user.entity'
// import { Repository } from 'typeorm'

describe('UserController', () => {
  let usersController: UsersController
  let usersService: Pick<
    jest.MockedObject<UsersService>,
    'createUser' | 'findOne' | 'remove'
  >
  //   let repository: Repository<User>

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
    // repository = app.get<Repository<User>>(getRepositoryToken(User))
  })
  it('shold get me if user existis in database', async () => {
    const mockUser = {
      id: '1',
      firstName: 'joe',
      lastName: 'mama',
      imageUrl: 'someImageURL'
    }
    usersService.createUser.mockResolvedValueOnce(mockUser)
    expect(await usersController.create(mockUser)).toEqual(mockUser)
  })
})
