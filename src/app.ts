import { RequestConfig, getLocale, history } from '@umijs/max';
import 'animate.css';
import qs from 'qs';
import { toast } from 'react-toastify';
import { addImgHost, getApiDomain, isLogin, urlParse } from './utils';

let cancelFlag: boolean = false;
let search = '';

export const request: RequestConfig = {
  timeout: 15000,
  errorConfig: {
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      if (
        error.code === 'ECONNABORTED' ||
        error.code === 'ERR_NETWORK' ||
        error.code === 'ERR_BAD_REQUEST'
      ) {
        toast.error('network error', { toastId: 'networkError' });
      }
      if (error?.response?.status === 500) {
        toast.error('system error', { toastId: 'systemError' });
      }
    },
  },
  requestInterceptors: [
    (url, options) => {
      const params = urlParse();
      if (params?.loginToken) {
        window.localStorage.setItem('token', params.loginToken as string);
      }

      const token = window.localStorage.getItem('token');
      if (token) {
        options.headers.token = token;
      }
      options.headers.lang = getLocale();

      const apiUrl = getApiDomain() + url;

      if (options.method === 'post') {
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        options.data = qs.stringify(options.params);
        delete options.params;
      }

      return { url: apiUrl, options };
    },
  ],
  responseInterceptors: [
    (response: any) => {
      const { data } = response;

      if (data?.status !== 0 && data?.msg) {
        toast.error(data.msg, { toastId: 'serverError' });
      }
      if (data?.status === 401) {
        if (cancelFlag) return;
        cancelFlag = true;
        localStorage.removeItem('token');
        setTimeout(() => {
          history.push(
            `/login?redirect=${location.pathname}${
              location.search.split('?')[1]
                ? `&${location.search.split('?')[1]}`
                : ''
            }`,
          );
          setTimeout(() => {
            cancelFlag = false;
          }, 1000);
        }, 200);
      }
      if (data.status === 0 && data.data) {
        addImgHost(data.data);
      }
      return response;
    },
  ],
};

export function onRouteChange({
  location,
  isFirst,
}: {
  location: { search: string; pathname: string };
  isFirst: boolean;
}) {
  console.log(location);
  if (isFirst) {
    if (!!location.search) {
      search = location.search;
    } else {
      search = '';
    }
  } else {
    // history push|replace
    if (!location.search && !!search && !isLogin()) {
      history.push(`${location.pathname}${search}`);
    }
  }
}
