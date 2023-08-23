// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 用户种子记录 用户种子记录 GET /api/key/clientSeedHistory */
export async function clientSeedHistoryUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.clientSeedHistoryUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoRandKeyVo_>('/api/key/clientSeedHistory', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 15
      pageSize: '15',
      ...params,
    },
    ...(options || {}),
  });
}

/** 当前秘钥 当前秘钥 GET /api/key/currentKey */
export async function currentKeyUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataRandKeyVo_>('/api/key/currentKey', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 已公开秘钥记录 已公开秘钥记录 GET /api/key/keyHistory */
export async function keyHistoryUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.keyHistoryUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoRandKeyVo_>('/api/key/keyHistory', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 15
      pageSize: '15',
      ...params,
    },
    ...(options || {}),
  });
}

/** 重置秘钥 重置秘钥 POST /api/key/reset */
export async function resetUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resetUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataRandKeyVo_>('/api/key/reset', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 验证ROLL点 验证ROLL点 GET /api/key/verify */
export async function verifyUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.verifyUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataRandKeyVo_>('/api/key/verify', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 验证ROLL点 根据记录ID验证ROLL点 GET /api/key/verifyById */
export async function verifyUsingGET1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.verifyUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataRandKeyVo_>('/api/key/verifyById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
