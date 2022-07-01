import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, } from '@nestjs/swagger';

import * as os from 'os';
import pidusage = require('pidusage');
import * as v8 from 'v8';

@ApiTags('server-metrics')
@Controller('server-metrics')
export class MetricsController {
  constructor() {}

  @Post()
  async getServerMetrics(@Body() span: any) {
    console.log('collect pid usage endpoint hit');
    const defaultResponse = {
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      count: 0,
      mean: 0,
      timestamp: Date.now(),
    };

    const stats: any = {
      memory: 0,
      load: 0,
      timestamp: null,
      heap: null,
    };
    const stat = await pidusage(process.pid);
    // console.log(stat)
    const last = span.responses[span.responses.length - 1];

    // Convert from B to MB
    stats.cpu = stat.cpu;
    stats.memory = stat.memory / 1024 / 1024;
    stats.load = os.loadavg();
    stats.timestamp = Date.now();
    stats.heap = v8.getHeapStatistics();

    /*if (eventLoopStats) {
        stat.loop = eventLoopStats.sense();
      }*/

    span.os.push(stats);
    console.log(span.os.length);
    if (
      !span.responses[0] ||
      (last.timestamp + span.interval) * 1000 < Date.now()
    ) {
      console.log('Pushing default response');
      span.responses.push(defaultResponse);
    }

    // todo: I think this check should be moved somewhere else
    if (span.os.length >= span.retention) span.os.shift();
    if (span.responses[0] && span.responses.length > span.retention)
      span.responses.shift();

    return span;
  }
}
