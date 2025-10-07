import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  signup(createAuthDto: CreateAuthDto) {
    // Dummy signup response
    return {
      code: 200,
      message: 'User signed up successfully',
      data: {
        id: 1,
        name: createAuthDto.name,
        email: createAuthDto.email,
        token: 'dummy-signup-token-12345',
      },
      timestamp: new Date().toISOString(),
    };
  }

  login({ email, password }: { email: string; password: string }) {
    // Dummy login response
    if (email === 'test@example.com' && password === 'password123') {
      return {
        code: 200,
        message: 'Login successful',
        data: {
          id: 1,
          name: 'John Doe',
          email,
          token: 'dummy-login-token-98765',
        },
        timestamp: new Date().toISOString(),
      };
    }

    // Invalid credentials
    return {
      code: 401,
      message: 'Invalid credentials',
      error: 'Unauthorized',
      timestamp: new Date().toISOString(),
    };
  }
}
