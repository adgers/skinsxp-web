// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 归档展示渠道列表 GET /api/promotion/channel/listArchived */
export async function listChannelArchivedUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataMapStringListPromotionChannel_>(
    '/api/promotion/channel/listArchived',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 获取推广信息 推广码链接说明:前端需要根据推广码生成推广链接用户访问推广链接时将推广码存下,注册时自动填充.如果用户使用了不同的推广链接,会覆盖上一个推广链接的推广码 GET /api/promotion/getPromotionInfo */
export async function getPromotionInfoUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataPromotionInfoVo_>('/api/promotion/getPromotionInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 推广等级配置列表 GET /api/promotion/list */
export async function listUsingGET1(options?: { [key: string]: any }) {
  return request<API.ResultDataListPromotion_>('/api/promotion/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改推广码 POST /api/promotion/modifyInvitationCode */
export async function modifyInvitationCodeUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.modifyInvitationCodeUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/promotion/modifyInvitationCode', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 我的推广记录 GET /api/promotion/myPromotionLogPage */
export async function myPromotionLogPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.myPromotionLogPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoMyPromotionLogPageVo_>('/api/promotion/myPromotionLogPage', {
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
