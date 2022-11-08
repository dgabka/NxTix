import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Request() req): Observable<any> {
    return this.appService.getProfile(req.user.id);
  }
}
