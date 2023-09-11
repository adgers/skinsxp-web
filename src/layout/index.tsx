import { headHidden, urlParse } from '@/utils';
import {
  Outlet,
  history,
  setLocale,
  useLocation,
  useRequest,
} from '@umijs/max';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import BtmNav from './btm-nav';
import { getLangUsingGET } from '@/services/front/qiantaishouquanxiangguan';
import Footer from './foot';
import Header from './head';

export default function Layout() {
  const { pathname } = useLocation();
  const pathCls = pathname.split('/')[1];
  const { data } = useRequest(() => getLangUsingGET());
  useEffect(() => {
    const params = urlParse();
    const umi_locale = localStorage.getItem('umi_locale');
    if (params?.lang) {
      const lang = params?.lang || 'en-US';
      setLocale(lang as string);
    }
    if (!umi_locale && !!data) {
      setLocale(data);
    }
  }, []);

  useEffect(() => {
    if (history.action !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [history, pathname]);

  return (
    <div className={`root-bg ${pathCls}`}>
      {!headHidden() && <Header />}
      <div className="max-w-8xl w-full min-h-[calc(100vh-64px)] m-auto relative">
        <Outlet />
      </div>
      {/* {!headHidden() && <BtmNav />} */}
      {!headHidden() && <Footer />}
      <ToastContainer theme="dark" autoClose={2000} limit={1} />
    </div>
  );
}
