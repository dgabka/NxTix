import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(
    @Body() body: { username: string; password: string },
  ): Observable<{ access_token: string }> {
    return this.authService.login(body).pipe(
      catchError(() => {
        throw new UnauthorizedException('Invalid credentials');
      }),
    );
  }

  @Post('/register')
  register(
    @Body()
    body: {
      username: string;
      password: string;
      name: string;
      age: number;
    },
  ): Observable<{ access_token: string }> {
    return this.authService.register(body).pipe(
      catchError(() => {
        throw new UnauthorizedException('User already exists');
      }),
    );
  }
}
