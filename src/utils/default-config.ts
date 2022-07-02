import { Config } from "../interfaces/config.interface";

const defaultConfig: Config = {
  title: 'Express Status',
  theme: 'default.css',
  path: '/status',
  socketPath: '/socket.io',
  spans: [
    {
      interval: 1,
      retention: 60,
    },
    {
      interval: 5,
      retention: 60,
    },
    {
      interval: 15,
      retention: 60,
    },
  ],
  services: [
    {
      name: 'Core',
      host: 'http://service-core',
    },
  ],
  port: undefined,
  websocket: undefined,
  iframe: false,
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    heap: true,
    eventLoop: true,
    responseTime: true,
    rps: true,
    statusCodes: true,
  },
  ignoreStartsWith: '/admin',
  healthChecks: [],
};

export default defaultConfig