import {DynamicModule, Global, Module } from '@nestjs/common';

import {MetricsController} from './controllers/metrics.controller';

@Global()
@Module({})
export class ServerMetricsModule {
  static forRoot(): DynamicModule {
    return {
      providers: [],
      exports: [],
      controllers: [MetricsController],
      module: ServerMetricsModule,
    };
  }
}
