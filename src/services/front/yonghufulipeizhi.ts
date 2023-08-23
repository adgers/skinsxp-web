// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 用户福利等级列表 GET /api/bonus/list */
export async function listUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataCustomerBounsPageVo_>('/api/bonus/list', {
    method: 'GET',
    ...(options || {}),
  });
}
