// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** banner列表 GET /api/common/bannerList */
export async function getBannerListUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataListBanner_>('/api/common/bannerList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取图像验证码(base64格式) GET /api/common/captcha */
export async function captchaUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataCaptchaVo_>('/api/common/captcha', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 文档列表 GET /api/common/documentPage */
export async function documentPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.documentPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataPageInfoDocument_>('/api/common/documentPage', {
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

/** 获取箱子主题列表 GET /api/common/getBoxThemeList */
export async function getBoxThemeListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBoxThemeListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataListBoxThemeListVo_>('/api/common/getBoxThemeList', {
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

/** getDashBoardUrl GET /api/common/getDashBoardUrl */
export async function getDashBoardUrlUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDashBoardUrlUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataString_>('/api/common/getDashBoardUrl', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询默认图片list GET /api/common/getDefaultHeadPictureList */
export async function getDefaultHeadPictureListUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataListString_>('/api/common/getDefaultHeadPictureList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取默认邀请码 GET /api/common/getDefaultInvitationCode */
export async function getDefaultInvitationCodeUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataString_>('/api/common/getDefaultInvitationCode', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getLanguageList GET /api/common/getLanguageList */
export async function getLanguageListUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataListMapStringObject_>('/api/common/getLanguageList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取模块列表 GET /api/common/getModuleList */
export async function getModuleListUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataListModule_>('/api/common/getModuleList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** listInterface GET /api/common/listInterface */
export async function listInterfaceUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataList_>('/api/common/listInterface', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取邮箱验证码 GET /api/common/mailCode */
export async function mailCodeUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.mailCodeUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/common/mailCode', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 最近掉落 GET /api/common/recentOpenBox */
export async function getRecentOpenBoxUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRecentOpenBoxUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataListRecentOpenBoxGiftVo_>('/api/common/recentOpenBox', {
    method: 'GET',
    params: {
      // grade has a default value: 2
      grade: '2',
      // limit has a default value: 20
      limit: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** qq客服链接 GET /api/common/redirectQQ */
export async function redirectQQUsingGET(options?: { [key: string]: any }) {
  return request<any>('/api/common/redirectQQ', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取短信验证码 GET /api/common/smsCode */
export async function smsCodeUsingGET1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.smsCodeUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/common/smsCode', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取短信验证码 POST /api/common/smsCode */
export async function smsCodeUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.smsCodeUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/common/smsCode', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取系统公告 GET /api/common/sysNotice */
export async function sysNoticeUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysNoticeUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataListNotice_>('/api/common/sysNotice', {
    method: 'GET',
    params: {
      // topN has a default value: 1
      topN: '1',
      ...params,
    },
    ...(options || {}),
  });
}

/** 为当前用户获取短信验证码 GET /api/common/userSmsCode */
export async function userSmsCodeUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userSmsCodeUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/common/userSmsCode', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 为当前用户获取短信验证码 POST /api/common/userSmsCode */
export async function userSmsCodeUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userSmsCodeUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/common/userSmsCode', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 图片查看 GET /api/common/viewImage */
export async function viewImageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.viewImageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/common/viewImage', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 图片查看 GET /api/common/viewImage/${param0}.png */
export async function viewImageNewUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.viewImageNewUsingGETParams,
  options?: { [key: string]: any },
) {
  const { serialNo: param0, ...queryParams } = params;
  return request<any>(`/api/common/viewImage/${param0}.png`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
