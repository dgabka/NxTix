import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  IRegisterPayload,
  IUserAuthEntity,
  IUserProfileEntity,
  UserCreateMsg,
  UserGetAuthMsg,
  UserGetProfileMsg,
} from '@nxtix/types';

@Controller()
export class AppController {
  users = [
    { id: '1', username: 'john', password: 'qwerty' },
    { id: '2', username: 'dave', password: 'qwerty' },
  ];

  profiles = [
    { userId: '1', name: 'John Doe', age: 32 },
    { userId: '2', name: 'Dave Gabka', age: 27 },
  ];

  @MessagePattern(UserGetAuthMsg)
  getUserAuth(username: string): IUserAuthEntity {
    return this.users.find((u) => u.username === username);
  }

  @MessagePattern(UserCreateMsg)
  createUser(data: IRegisterPayload): IUserAuthEntity {
    const newUser = {
      id: `${+this.users.length + 1}`,
      username: data.username,
      password: data.password,
    };
    const newProfile = { userId: newUser.id, name: data.name, age: data.age };

    this.users.push(newUser);
    this.profiles.push(newProfile);

    return newUser;
  }

  @MessagePattern(UserGetProfileMsg)
  getProfile(userId: string): IUserProfileEntity {
    return this.profiles.find((p) => p.userId === userId);
  }
}
