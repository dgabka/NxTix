import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_CLIENT') private authClient: ClientProxy,
    @Inject('USERS_CLIENT') private usersClient: ClientProxy,
  ) {}

  login({ username, password }) {
    return this.authClient.send(
      { role: 'auth', cmd: 'login' },
      { username, password },
    );
  }

  getProfile(id: string) {
    return this.usersClient.send(
      {
        role: 'user',
        cmd: 'profile',
      },
      { id },
    );
  }
}
