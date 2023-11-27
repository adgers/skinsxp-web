import { getLangUsingGET } from '@/services/front/qiantaishouquanxiangguan';
import { headHidden, urlParse } from '@/utils';
import {
  Outlet,
  history,
  setLocale,
  useLocation,
  useModel,
  useRequest,
} from '@umijs/max';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BtmNav from './btm-nav';

import Banner from '@/pages/case/banner';
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

  useEffect(() => {
    const channelCode = params.channelCode || 'wgskins';
    if (window?.gtag) {
      gtag('event', 'pageview', {
        channelCode: channelCode,
      });
    }
    sessionStorage.setItem('channelCode', params?.cCode as string);
    setPageLoaded(true);
  }, []);

  useEffect(() => {
    if (history.action !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [history, pathname]);

  return (
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
  );
}
