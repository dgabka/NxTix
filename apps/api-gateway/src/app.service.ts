import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserGetProfileMsg } from '@nxtix/types';

@Injectable()
export class AppService {
  constructor(@Inject('USERS_CLIENT') private usersClient: ClientProxy) {}

  getProfile(id: string) {
    return this.usersClient.send(UserGetProfileMsg, id);
  }
}
