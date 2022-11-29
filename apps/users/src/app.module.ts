import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, DatabaseConfigService } from '@nxtix/config';
import { AppController } from './app.controller';
import { ProfileModule } from './profile/profile.module';
import { ProfileService } from './profile/profile.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [DatabaseConfigService],
      useFactory: (config: DatabaseConfigService) => config.user(),
    }),
    ProfileModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [UserService, ProfileService],
})
export class AppModule {}
