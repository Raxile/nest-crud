// user.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn().mockReturnValue({
              code: 201,
              message: 'User Found successfully (dummy)',
              data: {
                id: 1,
                name: 'Piyush Saxena',
                email: 'piyush@yopmail.com',
              },
            }),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });
  it('should return user response from service', () => {
    const result = userController.findOne();
    expect(result).toEqual({
      code: 201,
      message: 'User Found successfully (dummy)',
      data: {
        id: 1,
        name: 'Piyush Saxena',
        email: 'piyush@yopmail.com',
      },
    });

    // Now you can reference it directly without ESLint warning
    expect(userService.findOne).toHaveBeenCalled();
  });
});
