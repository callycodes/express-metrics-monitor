type ChartVisibility = {
    [key: string]: boolean
}
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
    chartVisibility: ChartVisibility,
    ignoreStartsWith: string,
    healthChecks: any[],
  };
