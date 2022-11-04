import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, Observable, of, tap, timeout } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('AUTH_CLIENT') private authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) return of(false);

    return this.authClient.send({ role: 'auth', cmd: 'check' }, { token }).pipe(
      timeout(3000),
      tap((user) => {
        req.user = user;
      }),
      map(() => true),
      catchError(() => of(false)),
    );
  }
}
