export interface Config {
    authorize?: any;
    title: string,
    theme: string,
    path: string,
    socketPath: string,
    spans:
      {
        os?: any[];
        responses?: any[];
        interval: number,
        retention: number,
      }[],
    services:
      {
        name: string,
        host: string,
      }[],
    port?: number,
    websocket?: string,
    iframe?: boolean,
    chartVisibility: {
      cpu: boolean,
      mem: boolean,
      load: boolean,
      heap: boolean,
      eventLoop: boolean,
      responseTime: boolean,
      rps: boolean,
      statusCodes: boolean,
    },
    ignoreStartsWith: string,
    healthChecks: any[],
  };
