import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

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
      {
        transport: Transport.TCP,
        name: 'USERS_CLIENT',
        options: {
          host: 'localhost',
          port: 5002,
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
