import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConfigService {
  commonConfig: TypeOrmModuleOptions;

  constructor(private configService: ConfigService) {
    this.commonConfig =
      this.configService.get<Partial<TypeOrmModuleOptions>>('database');
  }

  private getConfig(
    database: string,
    overrides: Partial<TypeOrmModuleOptions> = {},
  ) {
    return {
      ...this.commonConfig,
      database,
      autoLoadEntities: true,
      ...overrides,
    } as TypeOrmModuleOptions;
  }

  user(overrides?: Partial<TypeOrmModuleOptions>): TypeOrmModuleOptions {
    return this.getConfig('user', overrides);
  }
}
