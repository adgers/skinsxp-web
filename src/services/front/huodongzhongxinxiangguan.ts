// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 活跃度奖励领取 POST /api/activityCenter/activity/reward */
export async function activityRewardUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.activityRewardUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataActivityRewardResultVo_>(
    '/api/activityCenter/activity/reward',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取活跃度信息 GET /api/activityCenter/activityInfo */
export async function activityInfoUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataActivityInfoVo_>(
    '/api/activityCenter/activityInfo',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 签到 POST /api/activityCenter/signIn */
export async function signInUsingPOST(options?: { [key: string]: any }) {
  return request<API.ResultDataSignInListVo_>('/api/activityCenter/signIn', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取N天签到信息 不传参数,默认为7天 GET /api/activityCenter/signIn/list */
export async function signInListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.signInListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataSignInInfoVo_>(
    '/api/activityCenter/signIn/list',
    {
      method: 'GET',
      params: {
        // days has a default value: 7
        days: '7',
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 任务列表 GET /api/activityCenter/task/list */
export async function taskListUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataListMyTaskVo_>('/api/activityCenter/task/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 任务领奖 POST /api/activityCenter/task/reward */
export async function rewardUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.rewardUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/activityCenter/task/reward', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function completeUsingPOST(
  params: API.rewardUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/activityCenter/task/complete', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
