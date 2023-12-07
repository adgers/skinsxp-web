import { getLangUsingGET } from '@/services/front/qiantaishouquanxiangguan';
import { headHidden, urlParse } from '@/utils';
import {
  Outlet,
  getLocale,
  history,
  setLocale,
  useLocation,
  useModel,
  useRequest,
} from '@umijs/max';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BtmNav from './btm-nav';

import Banner from '@/pages/case/banner';
import {
  cloudflareTokenUsingPOST,
  modifyShowCloudFlareUsingPOST,
} from '@/services/front/zhandianweidushuju';
import { Turnstile } from '@marsidev/react-turnstile';
import Footer from './foot';
import GiftCase from './gift-case';
import Header from './head';
import RightNav from './right-nav';

const showBannerRoutes = ['/case', '/event'];

export default function Layout() {
  const { pathname } = useLocation();
  const pathCls = pathname.split('/')[1];
  const { data } = useRequest(() => getLangUsingGET());
  const { setPageLoaded } = useModel('socket');
  const { userInfo } = useModel('user');
  const params = urlParse();
  const [showCloudflare, setShowCloudflare] = useState(false);
  const locale = getLocale();

  const verifyCloudflare = async () => {
    const ret = await modifyShowCloudFlareUsingPOST();
    if (ret.status === 0) {
      if (ret?.data) {
        setShowCloudflare(false);
      } else {
        setShowCloudflare(true);
      }
    }
  };

  const handleSendToken = async (token: string) => {
    const ret = await cloudflareTokenUsingPOST({
      'cf-turnstile-response': token,
    });
    setShowCloudflare(false);
    if (ret?.status === 0) {
    }
  };

  useEffect(() => {
    if (params?.lang) {
      setLocale(params.lang as string);
      return;
    }
    const umi_locale = localStorage.getItem('umi_locale');
    if (!umi_locale && !!data) {
      setLocale(data);
    }
  }, [data]);

  let interval: any = null;

  useEffect(() => {
    const channelCode = params.channelCode || 'wgskins';
    if (window?.gtag) {
      gtag('event', 'pageview', {
        channelCode: channelCode,
      });
    }
    sessionStorage.setItem('channelCode', params?.cCode as string);
    setPageLoaded(true);
    verifyCloudflare();
    interval = setInterval(() => {
      verifyCloudflare();
    }, 7200000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  useEffect(() => {
    if (history.action !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [history, pathname]);

  return (
    <>
      {showCloudflare ? (
        <div className="bg-white w-[100vw] h-[100vh] pt-8 md:pt-[150px]">
          <div className="text-[32px] font-semibold mb-4 text-black pl-5 md:pl-[200px]">
            WGSKINS.COM
          </div>
          <Turnstile
            siteKey="0x4AAAAAAAN4Ou8ut65lzmuz"
            onError={() => {
              console.warn('you===bot');
            }}
            onSuccess={(token: string) => {
              handleSendToken(token);
            }}
            options={{
              theme: 'light',
              language: locale,
              retryInterval: 8000,
            }}
            className="ml-5 md:ml-[200px]"
          />
        </div>
      ) : (
        <div className={`root-bg ${pathCls}`}>
          {!headHidden() && <Header />}
          {showBannerRoutes.includes(location.pathname) && <Banner />}

          <div className="max-w-8xl w-full min-h-[calc(100vh-64px)] m-auto relative">
            <Outlet />
          </div>
          {!headHidden() && <BtmNav />}
          {!headHidden() && <Footer />}
          {<RightNav />}
          {!userInfo?.mail && <GiftCase />}
          <ToastContainer theme="dark" autoClose={2000} limit={1} />
        </div>
      )}
    </>
  );
}
