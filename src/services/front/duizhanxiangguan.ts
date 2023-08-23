// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 对战排行 GET /api/battle/battleRank */
export async function battleRankUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataBattleRankPageVo_>('/api/battle/battleRank', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 解散对战房间 POST /api/battle/cancelBattle */
export async function cancelBattleUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cancelBattleUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/battle/cancelBattle', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建对战房间(和玩家) POST /api/battle/createBattle */
export async function createBattleUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.createBattleUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataString_>('/api/battle/createBattle', {
    method: 'POST',
    params: {
      // pos has a default value: 1
      pos: '1',
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取房间详情 GET /api/battle/getBattleDetail */
export async function getBattleDetailUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBattleDetailUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBattleDetailVo_>('/api/battle/getBattleDetail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取对战结果 GET /api/battle/getBattleResults */
export async function getBattleResultsUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBattleResultsUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBattleResultVo_>('/api/battle/getBattleResults', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前对战分页 GET /api/battle/getCurrentPage */
export async function getCurrentPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCurrentPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoBattleVo_>('/api/battle/getCurrentPage', {
    method: 'GET',
    params: {
      // mode has a default value: -1
      mode: '-1',
      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 10
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取我的对战房间分页 GET /api/battle/getMyPage */
export async function getMyPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMyPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoBattleVo_>('/api/battle/getMyPage', {
    method: 'GET',
    params: {
      // mode has a default value: -1
      mode: '-1',
      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 10
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取对战房间分页 0->等待中,1->对战中,2->完成; mode: 0->欧皇,1->非酋,不传全部 GET /api/battle/getPage */
export async function getPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoBattleVo_>('/api/battle/getPage', {
    method: 'GET',
    params: {
      // mode has a default value: -1
      mode: '-1',
      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 10
      pageSize: '10',
      // state has a default value: -1
      state: '-1',
      ...params,
    },
    ...(options || {}),
  });
}

/** 加入对战房间 POST /api/battle/joinBattle */
export async function joinBattleUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.joinBattleUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/battle/joinBattle', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 加入一个机哥 POST /api/battle/joinBot */
export async function joinBotUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.joinBotUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/battle/joinBot', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
