import { Module } from '@nestjs/common';

import { MetricsController } from './controllers/metrics.controller';

@Module({
  imports: [],
  controllers: [MetricsController],
  providers: [],
})
export class ServerMetricsModule {}
