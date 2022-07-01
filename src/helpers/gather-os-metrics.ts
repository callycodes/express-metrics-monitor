import { requestMetrics } from "./request-metrics";

const pidusage = require('pidusage');
const os = require('os');
const v8 = require('v8');
const sendMetrics = require('./send-metrics');
const debug = require('debug')('express-status-monitor');

let eventLoopStats; // eslint-disable-line

try {
  eventLoopStats = require('event-loop-stats'); // eslint-disable-line
} catch (error) {
  console.warn('event-loop-stats not found, ignoring event loop metrics...');
}

module.exports = async (io, span, service) => {
  const collectedMetrics = await requestMetrics(service.host, span)
  sendMetrics(io, collectedMetrics.data, service)
};
