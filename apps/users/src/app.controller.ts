import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ role: 'user', cmd: 'get' })
  getUser(data: any) {
    const users = [
      { id: 1, username: 'john', password: 'qwerty' },
      { id: 2, username: 'dave', password: 'qwerty' },
    ];

    return users.find((u) => u.username === data.username);
  }

  @MessagePattern({ role: 'user', cmd: 'profile' })
  getProfile(data) {
    const profiles = [
      { userId: 1, name: 'John Doe', age: 32 },
      { userId: 2, name: 'Dave Gabka', age: 27 },
    ];

    return profiles.find((p) => p.userId === data.id);
  }
}
