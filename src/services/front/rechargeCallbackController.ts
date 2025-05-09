// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** adaPayCallback POST /api/callback/adaPayCallback */
export async function adaPayCallbackUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adaPayCallbackUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/callback/adaPayCallback', {
    method: 'POST',
    params: {
      ...params,
      adaPayCallback: undefined,
      ...params['adaPayCallback'],
    },
    ...(options || {}),
  });
}

/** aiPayCallback POST /api/callback/aiPayCallback */
export async function aiPayCallbackUsingPOST(
  body: Record<string, any>,
  options?: { [key: string]: any },
) {
  return request<string>('/api/callback/aiPayCallback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** unionPayCallback POST /api/callback/fuxinPayCallback */
export async function unionPayCallbackUsingPOST(
  body: API.FuxinCallback,
  options?: { [key: string]: any },
) {
  return request<string>('/api/callback/fuxinPayCallback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** gooPagoCallback POST /api/callback/goopagoCallback */
export async function gooPagoCallbackUsingPOST(
  body: Record<string, any>,
  options?: { [key: string]: any },
) {
  return request<string>('/api/callback/goopagoCallback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** jjkCallback POST /api/callback/jjkCallback */
export async function jjkCallbackUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.jjkCallbackUsingPOSTParams,
  body: string,
  options?: { [key: string]: any },
) {
  return request<string>('/api/callback/jjkCallback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** payerMaxCallback POST /api/callback/payerMaxCallback */
export async function payerMaxCallbackUsingPOST(options?: { [key: string]: any }) {
  return request<string>('/api/callback/payerMaxCallback', {
    method: 'POST',
    ...(options || {}),
  });
}

/** skinsBackCallback POST /api/callback/skinsBackCallback */
export async function skinsBackCallbackUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.skinsBackCallbackUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/callback/skinsBackCallback', {
    method: 'POST',
    params: {
      ...params,
      skinsBackCallback: undefined,
      ...params['skinsBackCallback'],
    },
    ...(options || {}),
  });
}

/** unionPayCallback POST /api/callback/unionPayCallback */
export async function unionPayCallbackUsingPOST1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.unionPayCallbackUsingPOST1Params,
  options?: { [key: string]: any },
) {
  return request<string>('/api/callback/unionPayCallback', {
    method: 'POST',
    params: {
      ...params,
      unionpayCallback: undefined,
      ...params['unionpayCallback'],
    },
    ...(options || {}),
  });
}

/** unionPayH5Callback POST /api/callback/unionPayH5Callback */
export async function unionPayH5CallbackUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.unionPayH5CallbackUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/callback/unionPayH5Callback', {
    method: 'POST',
    params: {
      ...params,
      unionpayCallback: undefined,
      ...params['unionpayCallback'],
    },
    ...(options || {}),
  });
}

/** uniPaymentCallback POST /api/callback/uniPaymentCallback */
export async function uniPaymentCallbackUsingPOST(body: string, options?: { [key: string]: any }) {
  return request<string>('/api/callback/uniPaymentCallback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
