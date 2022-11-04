import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  login(@Body() body): Observable<string> {
    return this.appService.login(body).pipe(
      catchError((e) => {
        throw new UnauthorizedException('Invalid credentials');
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Request() req): Observable<any> {
    return this.appService.getProfile(req.user.id);
  }
}
