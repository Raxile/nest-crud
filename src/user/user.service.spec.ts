// user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { buildResponse } from '../../utils';
import { ApiResponse } from 'types/response.type';

jest.mock('../../utils', () => ({
  buildResponse: jest.fn((response: ApiResponse) => response),
}));

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should return a user response', () => {
    const expected = {
      code: 201,
      message: 'User Found successfully (dummy)',
      data: {
        id: 1,
        name: 'Piyush Saxena',
        email: 'piyush@yopmail.com',
      },
    };

    const result = userService.findOne();
    expect(result).toEqual(expected);
    expect(buildResponse).toHaveBeenCalledWith(expected);
  });
});
