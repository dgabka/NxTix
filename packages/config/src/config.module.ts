import { Module } from '@nestjs/common';
import { TcpTransportConfigService } from './tcp-transport-config.service';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';
import databaseConfig from './database.config';
import servicesConfig from './services.config';
import { DatabaseConfigService } from './database-config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [databaseConfig, servicesConfig],
    }),
  ],
  providers: [TcpTransportConfigService, DatabaseConfigService, ConfigService],
  exports: [TcpTransportConfigService, DatabaseConfigService, ConfigService],
})
export class ConfigModule {}
