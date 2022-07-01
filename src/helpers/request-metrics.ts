import { default as axios } from 'axios';

export const requestMetrics = async (hostname: string, span: any) => {
    return axios.post(`${hostname}/health`, span)
}