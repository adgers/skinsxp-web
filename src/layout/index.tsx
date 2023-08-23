import { headHidden } from '@/utils';
import { Outlet, useLocation } from '@umijs/max';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BtmNav from './btm-nav';
import Footer from './foot';
import Header from './head';

export default function Layout() {
  const { pathname } = useLocation();
  const pathCls = pathname.split('/')[1];

  //路由变化时，滚动条回到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`root-bg ${pathCls}`}>
      {!headHidden() && <Header />}
      <div className="max-w-8xl w-full min-h-[calc(100vh-64px)] m-auto">
        <Outlet />
      </div>
      {!headHidden() && <BtmNav />}
      {!headHidden() && <Footer />}
      <ToastContainer
        theme="dark"
        position="top-center"
        autoClose={2000}
        limit={1}
      />
    </div>
  );
}
