import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get dbConfig() {
    return this.configService.get<{ host: 'string'; port: number }>('database');
  }
}
