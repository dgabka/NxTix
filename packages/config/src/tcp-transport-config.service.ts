import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IGenericTcpConfig } from '@nxtix/types';
import {
  ClientOptions,
  TcpClientOptions,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class TcpTransportConfigService {
  constructor(private configService: ConfigService) {}

  get auth(): ClientOptions {
    const config = this.configService.get<IGenericTcpConfig>('services.auth');
    return {
      transport: Transport.TCP,
      options: config,
    };
  }

  get users(): TcpClientOptions {
    const config = this.configService.get<IGenericTcpConfig>('services.users');
    return {
      transport: Transport.TCP,
      options: config,
    };
  }
}
