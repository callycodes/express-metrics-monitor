import { requestMetrics } from "./request-metrics";

import { sendMetrics } from './send-metrics';

export const gatherOsMetrics = async (io: any, span: any, service: any) => {
  try {
  const collectedMetrics = await requestMetrics(service.host, span)
  sendMetrics(io, collectedMetrics.data, service)
  } catch (err) {}
};
