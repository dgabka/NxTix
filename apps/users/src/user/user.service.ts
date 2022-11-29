import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(user: { username: string; password: string }): Observable<User> {
    return from(this.userRepository.save(user));
  }

  findOne(username: string) {
    return from(this.userRepository.findOneBy({ username }));
  }
}
