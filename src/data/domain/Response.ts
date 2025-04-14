/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Response<T> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}