// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取升级配置 GET /api/upgrade/getUpgradeConfig */
export async function getUpgradeConfigUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataUpgradeConfigVo_>('/api/upgrade/getUpgradeConfig', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 我的兑换券 GET /api/upgrade/myVoucher */
export async function myVoucherUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.myVoucherUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataExtPageInfoVoucherMyVoucherCountVo_>('/api/upgrade/myVoucher', {
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

/** 升级礼物分页 GET /api/upgrade/page */
export async function pageUsingGET1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoUpgradeGiftPageVo_>('/api/upgrade/page', {
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

/** 升级记录分页 state:1->升级成功,2->升级失败 GET /api/upgrade/upgradeRecordPage */
export async function upgradeRecordPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.upgradeRecordPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoUpgradePageVo_>('/api/upgrade/upgradeRecordPage', {
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

/** V3升级 POST /api/upgrade/v3/startUpgrade */
export async function v3StartUpgradeUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.v3StartUpgradeUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataUpgradeResultVo_>('/api/upgrade/v3/startUpgrade', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
