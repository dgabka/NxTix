import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';

import {
  ILoginPayload,
  IRegisterPayload,
  AuthLoginMsg,
  AuthRegisterMsg,
  AuthVerifyMsg,
  ILoginResponse,
  IAuthenticatedUser,
} from '@nxtix/types';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @MessagePattern(AuthLoginMsg)
  login(data: ILoginPayload): Observable<ILoginResponse> {
    return this.authService.validateUser(data).pipe(
      map((user) => this.authService.createAccessToken(user)),
      catchError(() => {
        throw new RpcException('Invalid credentials');
      }),
    );
  }

  @MessagePattern(AuthRegisterMsg)
  register(data: IRegisterPayload): Observable<ILoginResponse> {
    return this.authService.registerUser(data).pipe(
      map((user) => this.authService.createAccessToken(user)),
      catchError(() => {
        throw new RpcException('User cannot be created');
      }),
    );
  }

  @MessagePattern(AuthVerifyMsg)
  verify(token: string): Observable<IAuthenticatedUser> {
    try {
      return of(this.authService.verifyAccessToken(token)).pipe(
        map((payload) => ({
          username: payload.username,
          id: payload.sub,
        })),
      );
    } catch (_) {
      return throwError(() => new RpcException('Invalid token'));
    }
  }
}
