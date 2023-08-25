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

/** 领取等级福利 POST /api/bonus/receive */
export async function listUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/bonus/receive', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
