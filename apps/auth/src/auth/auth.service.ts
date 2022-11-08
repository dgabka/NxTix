import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import {
  IAuthenticatedUser,
  IJwtPayload,
  ILoginPayload,
  ILoginResponse,
  IRegisterPayload,
  IUserAuthEntity,
  UserCreateMsg,
  UserGetAuthMsg,
} from '@nxtix/types';
import { catchError, map, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_CLIENT')
    private usersClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  validateUser(data: ILoginPayload): Observable<IAuthenticatedUser> {
    return this.usersClient
      .send<IUserAuthEntity, string>(UserGetAuthMsg, data.username)
      .pipe(
        map((user) => {
          const { id, username, password } = user;
          if (password === data.password) {
            return { id, username };
          }
          throw new Error('Invalid credentials');
        }),
      );
  }

  registerUser(data: IRegisterPayload): Observable<IAuthenticatedUser> {
    return this.usersClient
      .send<IUserAuthEntity, IRegisterPayload>(UserCreateMsg, data)
      .pipe(
        map((user) => ({ id: user.id, username: user.username })),
        catchError(() => {
          throw new Error('User cannot be created');
        }),
      );
  }

  createAccessToken(user: IAuthenticatedUser): ILoginResponse {
    const payload = { username: user.username, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  verifyAccessToken(token: string): IJwtPayload {
    return this.jwtService.verify(token);
  }
}
