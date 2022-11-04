import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_CLIENT') private authClient: ClientProxy) {}

  login({ username, password }) {
    return this.authClient.send(
      { role: 'auth', cmd: 'login' },
      { username, password },
    );
  }

  register(data: any) {
    return this.authClient.send({ role: 'auth', cmd: 'register' }, data);
  }
}
