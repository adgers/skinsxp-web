// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 绑定上级用户推广码 POST /api/personalCenter/bindInviter */
export async function bindInviterUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.bindInviterUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/personalCenter/bindInviter', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 绑定安全方式 POST /api/personalCenter/bindSecurityWay */
export async function bindSecurityWayUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.bindSecurityWayUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/personalCenter/bindSecurityWay', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改邮箱 配合获取验证码接口使用,verifyCode->老邮箱验证码,newVerifyCode->新邮箱验证码,newMail->新邮箱,一个页面就行,不用下一步 POST /api/personalCenter/changeMail */
export async function changeMailUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.changeMailUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/personalCenter/changeMail', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改手机号 配合获取验证码接口使用,verifyCode->老手机号验证码,newVerifyCode->新手机号验证码,newPhone->新手机号,一个页面就行,不用下一步 POST /api/personalCenter/changePhone */
export async function changePhoneUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.changePhoneUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/personalCenter/changePhone', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取用户详情 GET /api/personalCenter/customerDetail */
export async function customerDetailUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataCustomerDetailVo_>('/api/personalCenter/customerDetail', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 批量使用饰品兑换代币 这里ids为饰品id，多个饰品以逗号(,)隔开 POST /api/personalCenter/exchangeOrnamentToQuantity */
export async function exchangeOrnamentToQuantityUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.exchangeOrnamentToQuantityUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/personalCenter/exchangeOrnamentToQuantity', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 批量使用兑换券兑换代币 这里ids为兑换券id，多个兑换券以逗号(,)隔开 POST /api/personalCenter/exchangeQuantity */
export async function exchangeQuantityUsingPOST1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.exchangeQuantityUsingPOST1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/personalCenter/exchangeQuantity', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取用户可用的安全方式 返回一个json数组,表示用户可用的安全验证方式:0->手机号进行验证,1->邮箱进行验证 GET /api/personalCenter/getAvailableSecurityWay */
export async function getAvailableSecurityWayUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataListInt_>('/api/personalCenter/getAvailableSecurityWay', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取当前用户的等级权益 GET /api/personalCenter/getGradeInfo */
export async function getGradeInfoUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataGradeInfoVo_>('/api/personalCenter/getGradeInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 我的账户变动记录 GET /api/personalCenter/getMyBalanceLog */
export async function getMyBalanceLogUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMyBalanceLogUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoMyBalanceLogVo_>('/api/personalCenter/getMyBalanceLog', {
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

/** 礼物背包-折扣券分页 GET /api/personalCenter/getMyCouponPage */
export async function getMyCouponPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMyCouponPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoMyCouponPageVo_>('/api/personalCenter/getMyCouponPage', {
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

/** 获取我的折扣券 GET /api/personalCenter/getMyCoupons */
export async function getMyCouponsUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMyCouponsUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataListMyCouponVo_>('/api/personalCenter/getMyCoupons', {
    method: 'GET',
    params: {
      // couponType has a default value: -1
      couponType: '-1',
      ...params,
    },
    ...(options || {}),
  });
}

/** 我的追梦记录 GET /api/personalCenter/getMyDreamLog */
export async function getMyDreamLogUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMyDreamLogUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoMyUpgradePageVo_>('/api/personalCenter/getMyDreamLog', {
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

/** 礼物背包-免费箱子(次数)分页 GET /api/personalCenter/getMyFreeBoxPage */
export async function getMyFreeBoxPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMyFreeBoxPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoMyFreeBoxPageVo_>('/api/personalCenter/getMyFreeBoxPage', {
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

/** 饰品背包 GET /api/personalCenter/getMyOrnamentPage */
export async function getMyOrnamentPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMyOrnamentPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoOrnament_>('/api/personalCenter/getMyOrnamentPage', {
    method: 'GET',
    params: {
      // moduleId has a default value: -1
      moduleId: '-1',

      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 15
      pageSize: '15',
      ...params,
    },
    ...(options || {}),
  });
}

/** 礼物背包-礼包分页 GET /api/personalCenter/getMyRewardPage */
export async function getMyRewardPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMyRewardPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoMyRewardPageVo_>('/api/personalCenter/getMyRewardPage', {
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

/** 兑换券背包 orderByPrice为true时表示按价格倒序排序，false->价格正序 GET /api/personalCenter/getMyVoucherPage */
export async function getMyVoucherPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMyVoucherPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataExtPageInfoVoucherMyVoucherCountVo_>(
    '/api/personalCenter/getMyVoucherPage',
    {
      method: 'GET',
      params: {
        // page has a default value: 1
        page: '1',
        // pageSize has a default value: 15
        pageSize: '15',
        // stat has a default value: -1
        stat: '-1',
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 修改昵称 POST /api/personalCenter/modifyNickname */
export async function modifyNicknameUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.modifyNicknameUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/personalCenter/modifyNickname', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改秘钥 POST /api/personalCenter/modifySecret */
export async function modifySecretUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.modifySecretUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/personalCenter/modifySecret', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改交易URL POST /api/personalCenter/modifyTradeUrl */
export async function modifyTradeUrlUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.modifyTradeUrlUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/personalCenter/modifyTradeUrl', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 开免费箱子 GET /api/personalCenter/openFreeBox */
export async function openFreeBoxUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.openFreeBoxUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataListOpenBoxResultVo_>('/api/personalCenter/openFreeBox', {
    method: 'GET',
    params: {
      // number has a default value: 1
      number: '1',
      ...params,
    },
    ...(options || {}),
  });
}

/** 饰品取回到steam ids为奖券id，多个以逗号(,)隔开 POST /api/personalCenter/ornamentRetrieval */
export async function ornamentRetrievalUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ornamentRetrievalUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataListOrnamentRetrievalResultVo_>(
    '/api/personalCenter/ornamentRetrieval',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 安全验证 配合获取验证码或者获取邮箱验证码进行操作,type:0->手机验证码,1->邮箱验证码,验证通过后将返回一次性安全操作码 POST /api/personalCenter/securityCheck */
export async function securityCheckUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.securityCheckUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataString_>('/api/personalCenter/securityCheck', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改交易URL POST /api/personalCenter/updateTradeUrl */
export async function updateTradeUrlUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateTradeUrlUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/personalCenter/updateTradeUrl', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户头像修改 POST /api/personalCenter/uploadAvatar */
export async function uploadAvatarUsingPOST(options?: { [key: string]: any }) {
  return request<API.ResultDataString_>('/api/personalCenter/uploadAvatar', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 用户头像修改V2 POST /api/personalCenter/uploadAvatarV2 */
export async function uploadAvatarV2UsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadAvatarV2UsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/personalCenter/uploadAvatarV2', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 批量使用礼包兑换券 只有rewardVoucherType=0的礼包兑换券才能选中进行兑换,rewardVoucherType=1表示是折扣券,这种无需兑换 POST /api/personalCenter/useRewardVoucher */
export async function useRewardVoucherUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.useRewardVoucherUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataListUseRewardVoucherResultVo_>(
    '/api/personalCenter/useRewardVoucher',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
