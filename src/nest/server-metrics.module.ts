import {DynamicModule, Module} from '@nestjs/common';

import {MetricsController} from './controllers/metrics.controller';

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
