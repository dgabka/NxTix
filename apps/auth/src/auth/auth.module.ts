import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { TcpTransportConfigService } from '@nxtix/config';
import { ConfigModule } from '@nxtix/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
    ConfigModule,
  ],
  providers: [
    AuthService,
    TcpTransportConfigService,
    {
      provide: 'USERS_CLIENT',
      useFactory: (configService: TcpTransportConfigService) => {
        const userServiceConfig = configService.users;
        return ClientProxyFactory.create(userServiceConfig);
      },
      inject: [TcpTransportConfigService],
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
