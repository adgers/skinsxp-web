// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 在线统计 GET /api/stat/onlineStat */
export async function onlineStatUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataBizStatVo_>('/api/stat/onlineStat', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 最近掉落 limit: 长度限制, isTop: 是否最佳掉落 GET /api/stat/recentDrop */
export async function recentDropUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.recentDropUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataListRecentDropVo_>('/api/stat/recentDrop', {
    method: 'GET',
    params: {
      // limit has a default value: 20
      limit: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** 最近掉落 limit: 长度限制, isTop: 是否最佳掉落 GET /api/stat/recentDrop */
export async function cloudflareTokenUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { 'cf-turnstile-response': string },
  options?: { [key: string]: any },
) {
  return request<{ data?: boolean; msg?: string; status?: number }>(
    '/api/auth/captcha',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
