import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'Piyush Kumar',
  })
  name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'piyush@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'securePassword123',
  })
  password: string;
}

export class LoginDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'test@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'password123',
  })
  password: string;
}
