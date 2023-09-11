// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 修改密码 POST /api/auth/changePassword */
export async function changePasswordUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.changePasswordUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/auth/changePassword', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 找回密码 POST /api/auth/findpwd */
export async function findpwdUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findpwdUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/auth/findpwd', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取用户环境语言 GET /api/auth/lang */
export async function getLangUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataString_>('/api/auth/lang', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录 type:0->手机登录,1->邮箱登录 POST /api/auth/login */
export async function loginUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loginUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataString_>('/api/auth/login', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 试玩登录 POST /api/auth/loginForTrial */
export async function loginForTrialUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loginForTrialUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataString_>('/api/auth/loginForTrial', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 注销登录(token将失效) POST /api/auth/logout */
export async function logoutUsingPOST(options?: { [key: string]: any }) {
  return request<API.ResultDataBoolean_>('/api/auth/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 注册 type:0->手机注册,1->邮箱注册,2->steam注册 POST /api/auth/signUp */
export async function signUpUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.signUpUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataAuthLoginVo_>('/api/auth/signUp', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 登录 type:0->手机登录,1->邮箱登录 POST /api/auth/smslogin */
export async function smsLoginUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.smsLoginUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataString_>('/api/auth/smslogin', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 登陆steam GET /api/auth/steamLogin */
export async function steamLoginUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.steamLoginUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/auth/steamLogin', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** steam登陆注册 GET /api/auth/steamSignUp */
export async function steamSignUpUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.steamSignUpUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataAuthLoginVo_>('/api/auth/steamSignUp', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 实名认证 POST /api/auth/verify */
export async function verifyUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.verifyUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataBoolean_>('/api/auth/verify', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
