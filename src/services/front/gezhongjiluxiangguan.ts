// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 开箱记录 GET /api/order/getMyBoxLogPage */
export async function getMyBoxLogPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMyBoxLogPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoMyBoxLogPageVo_>('/api/order/getMyBoxLogPage', {
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

/** 充值记录 state:0->未支付,1->已支付 GET /api/order/getMyRechargeOrderPage */
export async function getMyRechargeOrderPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMyRechargeOrderPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoMyRechargeOrderPageVo_>(
    '/api/order/getMyRechargeOrderPage',
    {
      method: 'GET',
      params: {
        // page has a default value: 1
        page: '1',
        // pageSize has a default value: 15
        pageSize: '15',
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 取回记录 state:1->等待发货,2->等待收货,3->取回成功,4->取回失败 GET /api/order/getMyRetrievalPage */
export async function getMyRetrievalPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMyRetrievalPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoMyRetrievalPageVo_>('/api/order/getMyRetrievalPage', {
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

/** 商城记录 GET /api/order/getMyStockOrderPage */
export async function getMyStockOrderPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMyStockOrderPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoMyStockOrderPageVo_>('/api/order/getMyStockOrderPage', {
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

/** 我的升级记录分页 GET /api/order/getMyUpgradePage */
export async function getMyUpgradePageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMyUpgradePageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoMyUpgradePageVo_>('/api/order/getMyUpgradePage', {
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
