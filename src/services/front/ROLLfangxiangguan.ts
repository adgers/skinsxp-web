// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** roll详情 state: 1->进行中 2->完成 GET /api/roll/detail */
export async function detailUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataRollRoomPageVo_>('/api/roll/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 奖品列表 state: 1->进行中 2->完成 GET /api/roll/giftList */
export async function giftListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.giftListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataListRollRoomGiftVo_>('/api/roll/giftList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** roll房分页列表 state: 1->进行中 2->完成 GET /api/roll/page */
export async function pageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoRollRoomPageVo_>('/api/roll/page', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 15
      pageSize: '15',
      // state has a default value: -1
      state: '-1',
      ...params,
    },
    ...(options || {}),
  });
}

/** 加入房间 POST /api/roll/partake */
export async function partakeUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.partakeUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/roll/partake', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 参与列表 GET /api/roll/partakeList */
export async function partakeListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.partakeListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataListRollCustomerVo_>('/api/roll/partakeList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 中奖客户列表 GET /api/roll/winnerList */
export async function winnerListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.winnerListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataListRollCustomerWithGiftVo_>('/api/roll/winnerList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
