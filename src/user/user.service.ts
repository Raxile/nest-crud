import { Injectable } from '@nestjs/common';
import { buildResponse } from '../../utils';

@Injectable()
export class UserService {
  findOne(this: void) {
    return buildResponse({
      code: 201,
      message: 'User Found successfully (dummy)',
      data: {
        id: 1,
        name: 'Piyush Saxena',
        email: 'piyush@yopmail.com',
      },
    });
  }
}
