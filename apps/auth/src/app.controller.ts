import { Controller, UnauthorizedException } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ role: 'auth', cmd: 'login' })
  login(data: any): Observable<any> {
    return this.authService.validateUser(data.username, data.password).pipe(
      map((user) => this.authService.login(user)),
      catchError((err) => {
        console.error('[AUTH]', err);
        throw new RpcException('Invalid credentials');
      }),
    );
  }

  @MessagePattern({ role: 'auth', cmd: 'check' })
  check(data: any) {
    try {
      return of(this.authService.verify(data.token)).pipe(
        map((payload) => ({ username: payload.username, id: payload.sub })),
      );
    } catch (err) {
      console.error('[AUTH]', err);
      return throwError(() => new RpcException('Invalid token'));
    }
  }
}
