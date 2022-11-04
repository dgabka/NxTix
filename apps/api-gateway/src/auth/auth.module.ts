import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
 imports: [
    ClientsModule.register([
      {
        transport: Transport.TCP,
        name: 'AUTH_CLIENT',
        options: {
          host: 'localhost',
          port: 5001,
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
