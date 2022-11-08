import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  AuthLoginMsg,
  AuthRegisterMsg,
  AuthVerifyMsg,
  IAuthenticatedUser,
  ILoginPayload,
  ILoginResponse,
  IRegisterPayload,
} from '@nxtix/types';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_CLIENT') private authClient: ClientProxy) {}

  login(data: ILoginPayload): Observable<ILoginResponse> {
    return this.authClient.send(AuthLoginMsg, data);
  }

  register(data: IRegisterPayload): Observable<ILoginResponse> {
    return this.authClient.send(AuthRegisterMsg, data);
  }

  verify(token: string): Observable<IAuthenticatedUser> {
    return this.authClient.send(AuthVerifyMsg, token);
  }
}
