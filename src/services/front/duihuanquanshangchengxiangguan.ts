// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 商城商品兑换 在个人中心相关,找到:获取我的折扣券接口,可以获得可用的优惠券,如需使用优惠券,则将couponId传入本接口,不使用,则留空或-1 POST /api/store/exchangeVoucherStock */
export async function exchangeVoucherStockUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.exchangeVoucherStockUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/store/exchangeVoucherStock', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取steam选项tags GET /api/store/filters */
export async function getTagsUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataListSteamTagVo_>('/api/store/filters', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 商城商品分页 GET /api/store/getItemPage */
export async function getVoucherStockPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVoucherStockPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoVoucherStockPageVo_>('/api/store/getItemPage', {
    method: 'GET',
    params: {
      // moduleId has a default value: -1
      moduleId: '-1',
      // orderByPrice has a default value: true
      orderByPrice: 'true',
      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 15
      pageSize: '15',
      // priceMax has a default value: -1
      priceMax: '-1',
      // priceMin has a default value: -1
      priceMin: '-1',
      ...params,
    },
    ...(options || {}),
  });
}
