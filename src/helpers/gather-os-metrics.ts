import { requestMetrics } from "./request-metrics";

import { sendMetrics } from './send-metrics';

export const gatherOsMetrics = async (io: any, span: any, service: any) => {
  try {
  span.os = span.os.length > 50 ? span.os.splice(-(span.os.length - 50)) : span.os
  span.responses = span.responses.length > 100 ? span.responses.splice(-(span.responses.length - 100)) : span.responses
  const collectedMetrics = await requestMetrics(service.host, span)
  sendMetrics(io, collectedMetrics.data, service)
  } catch (err) {}
};
