import { Module } from '@nestjs/common';
import { TcpTransportConfigService } from './tcp-transport-config.service';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';
import databaseConfig from './database.config';
import servicesConfig from './services.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [databaseConfig, servicesConfig],
    }),
  ],
  providers: [TcpTransportConfigService, ConfigService],
  exports: [TcpTransportConfigService, ConfigService],
})
export class ConfigModule {}
