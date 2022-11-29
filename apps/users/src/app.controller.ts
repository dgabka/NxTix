import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  IRegisterPayload,
  UserCreateMsg,
  UserGetAuthMsg,
  UserGetProfileMsg,
} from '@nxtix/types';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { map, Observable } from 'rxjs';
import { Profile } from './profile/profile.entity';
import { ProfileService } from './profile/profile.service';

@Controller()
export class AppController {
  constructor(
    private userService: UserService,
    private profileService: ProfileService,
  ) {}

  @MessagePattern(UserGetAuthMsg)
  getUser(username: string): Observable<User> {
    return this.userService.findOne(username);
  }

  @MessagePattern(UserCreateMsg)
  createUser(data: IRegisterPayload): Observable<User> {
    return this.userService.create(data).pipe(
      map((user) => {
        this.profileService.create({ ...data, user });
        return user;
      }),
    );
  }

  @MessagePattern(UserGetProfileMsg)
  getProfile(userId: number): Observable<Profile> {
    return this.profileService.findByUserId(userId);
  }
}
