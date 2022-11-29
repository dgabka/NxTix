import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  create(profile: { user: User; name: string; age: number }) {
    return from(this.profileRepository.save(profile));
  }

  findByUserId(userId: number): Observable<Profile> {
    return from(
      this.profileRepository.findOne({
        where: {
          user: { id: userId },
        },
      }),
    );
  }
}
