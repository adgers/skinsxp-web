// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 根据充值代币数量计算需要的人民币金额 该金额已经减去用户等级锁对应的充值优惠 GET /api/recharge/calculateAmount */
export async function calculateAmountUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.calculateAmountUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataAmountInfoVo_>('/api/recharge/calculateAmount', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据充值代币数量计算需要的人民币金额 该金额已经减去用户等级锁对应的充值优惠 GET /api/recharge/calculateQuantity */
export async function calculateQuantityUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.calculateQuantityUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataAmountInfoVo_>('/api/recharge/calculateQuantity', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 折扣券管理->充值折扣券分页 GET /api/recharge/coupon/rechargeCouponList */
export async function rechargeCouponListUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataListRechargeCouponRecordVo_>(
    '/api/recharge/coupon/rechargeCouponList',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 支付下单 在个人中心相关,找到:获取我的折扣券接口,可以获得可用的优惠券,如需使用优惠券,则将couponId传入本接口,不使用,则留空或-1 POST /api/recharge/makePayment */
export async function makePaymentUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.makePaymentUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPaymentVo_>('/api/recharge/makePayment', {
    method: 'POST',
    params: {
      // currencyCode has a default value: USD
      currencyCode: 'USD',

      ...params,
    },
    ...(options || {}),
  });
}

/** 查询充值结果 0->微信,1->支付宝,state:0->未支付,1->已支付2->已取消.
 GET /api/recharge/paymentState */
export async function paymentStateUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.paymentStateUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataRechargeOrderVo_>('/api/recharge/paymentState', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 支付渠道、汇率 GET /api/recharge/rechargeConfig */
export async function rechargeConfigUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataRechargeConfigVo_>('/api/recharge/rechargeConfig', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取充值优惠信息 返回系统的代币比例和当前用户等级所对应的折扣 GET /api/recharge/rechargeDiscountInfo */
export async function rechargeDiscountInfoUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataRechargeDiscountInfoVo_>('/api/recharge/rechargeDiscountInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 使用充值卡 POST /api/recharge/useCard */
export async function useCardUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.useCardUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/recharge/useCard', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 使用CDKEY POST /api/recharge/useCdkey */
export async function useCdkeyUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.useCdkeyUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/recharge/useCdkey', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
