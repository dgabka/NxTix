import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { AuthService } from './auth.service';
import { ILoginPayload, ILoginResponse, IRegisterPayload } from '@nxtix/types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() body: ILoginPayload): Observable<ILoginResponse> {
    return this.authService.login(body).pipe(
      catchError(() => {
        throw new UnauthorizedException('Invalid credentials');
      }),
    );
  }

  @Post('/register')
  register(
    @Body()
    body: IRegisterPayload,
  ): Observable<ILoginResponse> {
    return this.authService.register(body).pipe(
      catchError(() => {
        throw new UnauthorizedException('User already exists');
      }),
    );
  }
}
