// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 箱子详情 GET /api/case/caseDetail */
export async function boxDetailUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.boxDetailUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoxDetailVo_>('/api/case/caseDetail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 包含礼物 GET /api/case/caseGiftList */
export async function boxGiftListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.boxGiftListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoxGiftInfoVo_>('/api/case/caseGiftList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 箱子分页 箱子类型,-1->全部,0->免费,1->正常,2->推广 GET /api/case/casePage */
export async function boxPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.boxPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoBoxPageVo_>('/api/case/casePage', {
    method: 'GET',
    params: {
      // boxType has a default value: -1
      boxType: '-1',
      // moduleId has a default value: -1
      moduleId: '-1',
      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 100
      pageSize: '100',
      ...params,
    },
    ...(options || {}),
  });
}

/** 回收兑换券 POST /api/case/exchangeQuantity */
export async function exchangeQuantityUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.exchangeQuantityUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/case/exchangeQuantity', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 箱子详情分页 箱子类型,-1->全部,0->免费,1->正常,2->推广 GET /api/case/getCaseList */
export async function getBoxListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBoxListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataListBoxThemeListVo_>('/api/case/getCaseList', {
    method: 'GET',
    params: {
      // boxType has a default value: -1
      boxType: '-1',
      // moduleId has a default value: -1
      moduleId: '-1',
      ...params,
    },
    ...(options || {}),
  });
}

/** 开箱 在个人中心相关,找到:获取我的折扣券接口,可以获得可用的优惠券,如需使用优惠券,则将couponId传入本接口,不使用,则留空或-1 GET /api/case/openCase */
export async function v2OpenBoxUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.v2OpenBoxUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataOpenBoxResult_>('/api/case/openCase', {
    method: 'GET',
    params: {
      // number has a default value: 1
      number: '1',
      ...params,
    },
    ...(options || {}),
  });
}

/** 最近掉落 GET /api/case/recentCaseGift */
export async function recentBoxGiftUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.recentBoxGiftUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataListRecentBoxGiftVo_>('/api/case/recentCaseGift', {
    method: 'GET',
    params: {
      // limit has a default value: 20
      limit: '20',
      ...params,
    },
    ...(options || {}),
  });
}
