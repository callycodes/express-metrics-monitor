import { requestMetrics } from "./request-metrics";

import { sendMetrics } from './send-metrics';

// let eventLoopStats; // eslint-disable-line

/* try {
  eventLoopStats = require('event-loop-stats'); // eslint-disable-line
} catch (error) {
  console.warn('event-loop-stats not found, ignoring event loop metrics...');
} */

export const gatherOsMetrics = async (io: any, span: any, service: any) => {
  try {
  const collectedMetrics = await requestMetrics(service.host, span)
  sendMetrics(io, collectedMetrics.data, service)
  } catch (err) {}
};
