import {logoutUsingPOST} from '@/services/front/qiantaishouquanxiangguan';
//@ts-ignore
import Big from 'big.js';
import {EventEmitter} from 'events';
//@ts-ignore
import brFlag from '@/assets/flags/br.svg';
import cnFlag from '@/assets/flags/cn.svg';
import enFlag from '@/assets/flags/en.svg';
import trFlag from '@/assets/flags/tr.svg';
import deFlag from '@/assets/flags/de.svg';
import frFlag from '@/assets/flags/fr.svg';
import plFlag from '@/assets/flags/pl.svg';
import esFlag from '@/assets/flags/es.svg';
import jaFlag from '@/assets/flags/ja.svg';
import krFlag from '@/assets/flags/kr.svg';


import {BOX_GRADES} from '@/constants';
import {history} from '@umijs/max';
import qs from 'qs';
import {useEffect, useRef} from 'react';

const globalEventEmitter = new EventEmitter();

export function getApiDomain() {
    if (
        location.href.indexOf('localhost') > -1 ||
        location.href.indexOf('127.0.0.1') > -1 ||
        location.href.indexOf('114.55.56.184')
    ) {
        return 'http://114.55.56.184:9999';
    } else {
        var url = location.href;
        var mainDomain = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+\.[^:\/\n.]+)/im)[1];
        return 'https://api.' + mainDomain;
    }
}

export function getSocketDomain() {
    if (
        location.href.indexOf('localhost') > -1 ||
        location.href.indexOf('127.0.0.1') > -1 ||
        location.href.indexOf('114.55.56.184')
    ) {
        return 'ss://114.55.56.184:9999/ws';
    } else {
        var url = location.href;
        var mainDomain = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+\.[^:\/\n.]+)/im)[1];
        return 'wss://api.' + mainDomain + '/ws';
    }
}

export function getImgHost() {
    if (
        location.href.indexOf('localhost') > -1 ||
        location.href.indexOf('127.0.0.1') > -1 ||
        location.href.indexOf('114.55.56.184')
    ) {
        return 'http://test-wgskins-file.oss-cn-hangzhou.aliyuncs.com/cdn/image/';
    } else {
        return 'https://img.wgskins.com/cdn/image/';
    }
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
    try {
        const result = name.split('|');
        const weaponName = result[0]; // 饰品名字
        const pifuName = result?.splice(1)?.join('|');
        const nameArr = [weaponName];
        // 反转饰品的皮肤 查看是否有磨损
        const reverseName = pifuName?.split('')?.reverse()?.join('');

        if (!!reverseName?.split(')')?.[0]?.trim()) {
            // 没有磨损
            nameArr.push(...['', pifuName]);
        } else {
            //   有磨损度
            const pifuNameArr = pifuName.split(' (');
            const [first, second] = pifuNameArr?.[1]
                ?.replace(/[()]/g, '')
                ?.split(' ')
                ?.join('-')
                ?.split('-');
            const rF = first?.split('')?.[0];
            const rS = second?.split('')?.[0];
            let realDura = rS ? rF + rS : rF;
            nameArr.push(realDura?.toUpperCase() || '');

            nameArr.push(pifuNameArr?.[0]);
        }
        return nameArr;
    } catch (error) {
        return ['', '', name];
    }
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
    return /wgskins/i.test(navigator.userAgent);
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
    return new Intl.NumberFormat(country, {style: 'currency', currency}).format(
        number,
    );
}

export function getSteamLoginUrl() {
    const redirectUrl = urlParse().callbackUrl || location.pathname;
    const params = urlParse();

    let query = {
        redirectUrl: redirectUrl,
        promoteCode: params.promoteCode,
        channelCode: params.channelCode,
    };

    let callbackUrl = `${
        window.location.origin
    }/login/steamCallback?params=${JSON.stringify(query)}`;

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

export const langs = [
    {
        title: 'English(EN)',
        value: 'en-US',
        flag: enFlag,
    },
    {
        title: 'Portugalia(BR)',
        value: 'pt-BR',
        flag: brFlag,
    },
    {
        title: '繁體中文(HK)',
        value: 'zh-TW',
        flag: cnFlag,
    },
    {
        title: 'Türk(TR)',
        value: 'tr-TR',
        flag: trFlag,
    },
    {
        title: 'Français(FR)',
        value: 'fr-FR',
        flag: frFlag,
    },
    {
        title: 'Deutsch(DE)',
        value: 'de-DE',
        flag: deFlag,
    },
    {
        title: 'Polski(PL)',
        value: 'pl-PL',
        flag: plFlag,
    },
    {
        title: 'Polski(ES)',
        value: 'es-ES',
        flag: esFlag,
    },
    {
        title: '日本語(JP)',
        value: 'ja-JP',
        flag: jaFlag,
    },
    {
        title: '한국인(KR)',
        value: 'ko-KR',
        flag: krFlag,
    },
];
