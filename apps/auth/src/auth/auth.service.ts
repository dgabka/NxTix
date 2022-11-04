import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_CLIENT')
    private usersClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  validateUser(username: string, pass: string): Observable<any> {
    return this.usersClient
      .send({ role: 'user', cmd: 'get' }, { username })
      .pipe(
        map((user) => {
          if (user.password === pass) {
            return user;
          }
          throw new Error('Invalid credentials');
        }),
      );
  }

  login(user: any) {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  verify(token: string) {
    return this.jwtService.verify(token);
  }
}
