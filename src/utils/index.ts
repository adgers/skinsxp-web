import { logoutUsingPOST } from '@/services/front/qiantaishouquanxiangguan';
//@ts-ignore
import Big from 'big.js';
import { EventEmitter } from 'events';
//@ts-ignore
import { BOX_GRADES } from '@/constants';
import { history } from '@umijs/max';
import qs from 'qs';
import { useEffect, useRef } from 'react';

const globalEventEmitter = new EventEmitter();

export function getApiDomain() {
  if (
    location.href.indexOf('localhost') > -1 ||
    location.href.indexOf('127.0.0.1') > -1
  ) {
    // return 'http://127.0.0.1:9999';
    return 'https://api.wgskins.com';
  } else if (location.href.indexOf('wgskins.com') > -1) {
    return '//api.wgskins.com';
  } else {
    return '//api.wgskins.com';
  }
}

export function getSocketDomain() {
  if (
    location.href.indexOf('localhost') > -1 ||
    location.href.indexOf('127.0.0.1') > -1
  ) {
    // return 'wss://api.wgskins.com/ws';

    return 'http://127.0.0.1:9999';
  } else {
    return 'wss://api.wgskins.com/ws';
  }
}

export function getImgHost() {
  if (
    location.href.indexOf('localhost') > -1 ||
    location.href.indexOf('127.0.0.1') > -1
  ) {
    // return 'http://muskins-test.oss-cn-hangzhou.aliyuncs.com/root/image/';
    return 'https://img.wgskins.com/root/image/';
  } else if (location.href.indexOf('wgskins.com') > -1) {
    return '//img.wgskins.com/root/image/';
  }
  return 'http://muskins-test.oss-cn-hangzhou.aliyuncs.com/root/image/';
}

export async function logout() {
  await logoutUsingPOST();
  window.localStorage.removeItem('token');
  window.location.href = '/';
}

export function isLogin() {
  return !!window.localStorage.getItem('token');
}

export function numberFixed(num: number, fixed: number = 2) {
  return new Big(num).toFixed(fixed);
}

export function numberRoundUp(num: number) {
  return Math.ceil(num * 100) / 100;
}

export function urlParse() {
  const url = location.href;
  return qs.parse(url.split('?')[1]);
}

export function getBoxColor(grade: number) {
  return BOX_GRADES[grade];
}

export function saveLocalSettings(key: any, value: any) {
  const settings = JSON.parse(window.localStorage.getItem('settings') || '{}');
  settings[key] = value;
  window.localStorage.setItem('settings', JSON.stringify(settings));
}

export function getLocalSettings(key: any) {
  const settings = JSON.parse(window.localStorage.getItem('settings') || '{}');
  return settings[key];
}

export function isMobile() {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
}

export function isWeixin() {
  return /MicroMessenger/i.test(navigator.userAgent);
}

export function parseName(name: string) {
  const result = name.split(' (');
  const nameArr = [result[0]];
  if (result[1]) {
    const [first, second] = result[1].replace(/[()]/g, '')?.split(' ')?.join("-").split("-");
    const rF = first?.split('')?.[0];
    const rS = second?.split('')?.[0];
    let realDura = rS ? rF + rS : rF;
    nameArr.push(realDura.toUpperCase());
  }
  return nameArr;
}

export function triggerLoginExpired() {
  globalEventEmitter.emit('loginExpired');
}

export function subscribeToLoginExpired(callback: any) {
  globalEventEmitter.on('loginExpired', callback);
}

export function goback() {
  history.go(-1);
}

export function sleep(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

export function addImgHost(data: any) {
  const arr = [
    'giftImage',
    'headPic',
    'headGround',
    'image',
    'secondVideo',
    'video',
    'banner',
    'boxImage',
    'giftImage',
    'weaponImage',
    'winVoucherImg',
    'sourceImage',
  ];

  //递归data, 如果是数组,则遍历数组,如果是对象,则遍历对象的属性，包含arr中的属性，则加上图片前缀
  const addHost = (data: any) => {
    const imgHost = getImgHost();
    if (!data) return data;
    if (typeof data === 'string') {
      if (data.indexOf('http') < 0) {
        return imgHost + data;
      }
    }
    if (Array.isArray(data)) {
      for (const item of data) {
        addHost(item);
      }
      return data;
    }
    if (typeof data === 'object') {
      for (const key in data) {
        if (arr.includes(key)) {
          if (data[key].indexOf('http') < 0) {
            data[key] = imgHost + data[key];
          }
        } else {
          addHost(data[key]);
        }
      }
      return data;
    }
  };
  addHost(data);
  return data;
}

export function isInApp() {
  return /muskins/i.test(navigator.userAgent);
}

export function headHidden() {
  if (isInApp()) return true;
  const params = urlParse();
  return params?.headHidden && params?.headHidden === 'true';
}

export function currencyFormat(
  country: string,
  currency: string,
  number: number,
) {
  return new Intl.NumberFormat(country, { style: 'currency', currency }).format(
    number,
  );
}

export function getSteamLoginUrl() {
  const redirectUrl = urlParse().redirect;
  const params = urlParse();

  let callbackUrl = redirectUrl
    ? `${window.location.origin}/login/callback?redirect=${redirectUrl}`
    : `${window.location.origin}/login/callback`;

  if (params.promoteCode) {
    callbackUrl += callbackUrl.indexOf('?') > -1 ? '&' : '?';
    callbackUrl += `promoteCode=${params.promoteCode}`;
  }

  return (
    getApiDomain() +
    '/api/auth/steamLogin?callbackUrl=' +
    encodeURIComponent(callbackUrl)
  );
}

/**
 * react中异步回调中的state,是创建的那次渲染中看到的,不是最新的state
 * 这个hook使用useRef保存那个state,确保获取最新的state
 * @param state
 * @returns
 */
export function useStateRef(state: any) {
  const stateRef = useRef<any>();
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  return stateRef;
}

export function isSafari() {
  return (
    navigator.userAgent.indexOf('Safari') > -1 &&
    navigator.userAgent.indexOf('Chrome') === -1
  );
}
