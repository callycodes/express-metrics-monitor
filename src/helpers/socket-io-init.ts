import {Config} from '../interfaces/config.interface';

const socketIo = require('socket.io');
import {gatherOsMetrics} from './gather-os-metrics';

const addSocketEvents = (socket: any, config: Config) => {
  socket.emit('esm_start', {spans: config.spans, services: config.services});
  socket.on('esm_change', () => {
    socket.emit('esm_start', {spans: config.spans});
  });
};

let io: any

export const socketIoInit = (server: any, config: Config) => {
  if (io === null || io === undefined) {
    if (config.websocket !== null && config.websocket !== undefined) {
      io = config.websocket;
    } else {
      io = socketIo(server);
    }

      io.on('connection', (socket: any) => {
        if (config.authorize) {
          config
            .authorize(socket)
            .then((authorized: any) => {
              if (!authorized) socket.disconnect('unauthorized');
              else addSocketEvents(socket, config);
            })
            .catch(() => socket.disconnect('unauthorized'));
        } else {
          addSocketEvents(socket, config);
        }
      });

    config.services.forEach(service => {
      config.spans.forEach(span => {
        span.os = [];
        span.responses = [];
        const interval = setInterval(
          () => gatherOsMetrics(io, span, service),
          span.interval * 1000
        );

        // Don't keep Node.js process up
        interval.unref();
      });
    });
  }
};
