import FindPwd from '@/components/account/findPwd';
import Login from '@/components/account/login';
import MobileLogin from '@/components/account/mobileLogin';
import Register from '@/components/account/register';
import { IconFont } from '@/components/icons';
import Benefit from '@/pages/benefit';
import LoginConfirm from '@/pages/login/loginConfirm';
import LoginTip from '@/pages/login/loginTip';
import { isLogin, langs, logout, numberFixed } from '@/utils';
import { MenuOutlined } from '@ant-design/icons';
import { Menu, Transition } from '@headlessui/react';
import {
  FormattedMessage,
  Link,
  getLocale,
  matchRoutes,
  setLocale,
  useLocation,
  useModel,
} from '@umijs/max';
import { Fragment, useEffect } from 'react';
import CountUp from 'react-countup';
import { Button, Navbar } from 'react-daisyui';
import './index.less';
import OpenHistory from './open-history';
import Placard from './placard';

export default function Header() {
  const {
    userInfo,
    smsLoginShow,
    registerShow,
    loginShow,
    findPwdShow,
    benefitShow,
    showBenefit,
    steamLoginShow,
    showSteamLogin,
    loginTipShow,
    showLoginTip,
  } = useModel('user');

  const location = useLocation();
  const locale = getLocale();

  const hidePlacard = () => {
    return matchRoutes(
      [
        {
          path: '/battle/:id',
        },
      ],
      location.pathname,
    );
  };

  const changeConfirmLocale = (val: string) => {
    setLocale(val);
  };

  useEffect(() => {
    if (!isLogin()) {
      showLoginTip();
    }
  }, []);

  const headLinks = [
    {
      title: <FormattedMessage id="main_tab_home" />,
      link: '/case',
      icon: 'icon-cases1',
    },
    {
      title: <FormattedMessage id="main_tab_arena" />,
      link: '/battle',
      icon: 'icon-battle',
    },
    {
      title: <FormattedMessage id="home_spsc" />,
      link: '/market',
      icon: 'icon-store',
    },
    {
      title: <FormattedMessage id="roll_room_title" />,
      link: '/giveaways',
      icon: 'icon-giveaway',
    },
  ];

  const headExt = isLogin()
    ? [
        {
          title: <FormattedMessage id="home_item_hzhb" />,
          link: '/profile/partner',
          icon: 'icon-partner',
        },
      ]
    : [];

  const menuLinks = [
    {
      title: <FormattedMessage id="personal_center" />,
      link: '/profile/bag',
      icon: 'icon-cases',
    },
    {
      title: <FormattedMessage id="history_record" />,
      link: '/profile/record',
      icon: 'icon-history',
    },
    ...headExt,
  ];

  const customLinks = [
    {
      title: <FormattedMessage id="mine_bzzx" />,
      link: '/docs',
      icon: 'icon-support',
    },
    {
      title: <FormattedMessage id="mine_gpyz" />,
      link: '/provably-fair',
      icon: 'icon-shield',
    },
  ];

  const menus = (
    <>
      <Menu.Items className="outline-none">
        {menuLinks.map((link, i) => (
          <Menu.Item key={i}>
            {({ active }) => (
              <Link
                className={`${
                  active ? 'bg-accent bg-opacity-30 text-green' : ''
                } flex items-center py-2 rounded cursor-pointer`}
                to={link.link}
              >
                {link.icon && (
                  <IconFont
                    type={link.icon}
                    className="mx-5 md:mx-3 text-base"
                  />
                )}
                <span className="text-sm capitalize">{link.title}</span>
              </Link>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
      <div className="my-2 mx-5 md:mx-3 text-xs uppercase font-semibold">
        <FormattedMessage id="nav_title_games" />
      </div>
      <Menu.Items className="outline-none">
        {headLinks.map((link, i) => (
          <Menu.Item key={i}>
            {({ active }) => (
              <Link
                className={`${
                  active ? 'bg-accent bg-opacity-30 text-green' : ''
                } flex items-center py-2 rounded cursor-pointer`}
                to={link.link}
              >
                {link.icon && (
                  <IconFont
                    type={link.icon}
                    className="mx-5 md:mx-3 text-base"
                  />
                )}
                <span className="text-sm capitalize">{link.title}</span>
              </Link>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
      <div className="my-2 mx-5 md:mx-3 text-xs uppercase font-semibold">
        <FormattedMessage id="nav_title_services" />
      </div>
      <Menu.Items className="outline-none">
        {customLinks.map((link, i) => (
          <Menu.Item key={i}>
            {({ active }) => (
              <Link
                className={`${
                  active ? 'bg-accent bg-opacity-30 text-green' : ''
                } flex items-center py-2 rounded cursor-pointer`}
                to={link.link}
              >
                {link.icon && (
                  <IconFont
                    type={link.icon}
                    className="mx-5 md:mx-3 text-base"
                  />
                )}
                <span className="text-sm capitalize">{link.title}</span>
              </Link>
            )}
          </Menu.Item>
        ))}
        <Menu.Item>
          {({ active }) => (
            <div
              className={`${
                active ? 'bg-accent bg-opacity-30 text-green' : ''
              } flex items-center py-2 rounded cursor-pointer`}
              onClick={showBenefit}
            >
              <IconFont
                type="icon-promocode"
                className="mx-5 md:mx-3 text-base"
              />
              <span className="text-sm capitalize">
                <FormattedMessage id="mine_fllq" />
              </span>
            </div>
          )}
        </Menu.Item>
      </Menu.Items>
    </>
  );

  const currentLoale = langs.filter((item) => item.value === locale)[0];

  return (
    <div className="sticky left-0 top-0 z-[99]">
      <Navbar className="p-3 bg-black">
        <div className="flex-1">
          <Link to={'/'} className=" ml-2 w-[100px] sm:w-[164px]">
            <img src={require('@/assets/wg-logo.png')} />
          </Link>

          <Menu as="div" className="relative ml-2">
            <Menu.Button className="select select-xs flex items-center border-0 bg-black focus:outline-none">
              <img src={currentLoale.flag} className="w-5 h-5" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="z-50 flex flex-col focus:outline-none absolute left-0 top-8 h-auto origin-top-right rounded transform opacity-100 bg-dark w-[120px]">
                {langs.map((item, i) => (
                  <Menu.Item key={i}>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? 'bg-accent bg-opacity-30 text-green' : ''
                        } flex items-center px-2 py-1 text-xs rounded cursor-pointer w-full`}
                        onClick={() => changeConfirmLocale(item.value)}
                      >
                        <img src={item.flag} className="w-5 h-5" />
                        <span className="pl-2 whitespace-nowrap">
                          {item.title}
                        </span>
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>

          <div className="hidden lg:flex ml-2 relative">
            {[...headLinks, ...headExt].map((item, i) => {
              const isActive = location.pathname.startsWith(item.link);

              return (
                <Link
                  key={i}
                  to={item.link}
                  className={`p-3 uppercase transition-colors font-semibold duration-200 hover:text-green text-sm ${
                    isActive ? 'text-green' : 'text-white'
                  }`}
                  style={{
                    background: isActive
                      ? 'linear-gradient(0deg, #50B444 -19.44%, rgba(0, 0, 0, 0.00) 90.14%)'
                      : 'none',
                  }}
                >
                  {item.icon && (
                    <IconFont
                      type={item.icon}
                      className={`mr-2 ${
                        isActive ? 'text-green' : 'text-[#a4a4a4]'
                      } `}
                    />
                  )}
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex-none flex gap-4">
          {userInfo ? (
            <>
              <div
                className="uppercase transition-colors font-semibold duration-200 text-white hover:text-green text-sm rounded-md cursor-pointer hidden sm:block"
                onClick={showBenefit}
              >
                <IconFont type="icon-promocode" className="mr-1" />
                <FormattedMessage id="mine_fllq" />
              </div>
              <Link
                className="btn-green !btn-sm !px-1"
                to="/deposit"
                onClick={() => {
                  window?.fbq(
                    'trackSingleCustom',
                    '1024868335308144',
                    'InitiateCheckout',
                  );
                  window?.gtag('event', 'conversion', {
                    send_to: 'AW-11345409756/EOFKCIqQy-UYENzt9KEq',
                  });
                }}
              >
                <IconFont type="icon-funds" className="text-xl text-green" />
                <div className="text-xs text-white px-1 font-semibold hidden sm:block">
                  <FormattedMessage id="wc_rewards_deposit" />
                </div>

                {!!userInfo?.rebateValue && userInfo?.rebateValue > 0 && (
                  <div className="text-green font-semibold">
                    +{Number(userInfo?.rebateValue)}%
                  </div>
                )}
              </Link>

              <div className="flex flex-col text-xs font-num">
                <div className="text-green">
                  $
                  <CountUp
                    end={numberFixed(userInfo?.balance || 0)}
                    duration={1}
                    decimals={2}
                    separator=""
                    className="font-num"
                  />
                </div>
                <span className="text-purple">
                  <IconFont type="icon-coin" className="mr-1" />
                  <CountUp
                    end={numberFixed(userInfo?.secondaryBalance || 0)}
                    duration={1}
                    decimals={2}
                    separator=""
                    className="font-num"
                  />
                </span>
              </div>

              <Menu
                as="div"
                className="relative flex justify-center items-center"
              >
                <Menu.Button
                  as="div"
                  className="flex gap-1 items-center cursor-pointer"
                >
                  <div className="w-8 h-8 cursor-pointer relative hidden sm:block">
                    <img src={userInfo.headPic} className="rounded-full" />
                  </div>
                  <div className="py-1 px-2 bg-dark">
                    <MenuOutlined />
                  </div>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div className="fixed left-0 top-0 z-[999] flex h-screen w-full origin-top flex-col overflow-scroll focus:outline-none md:absolute md:left-auto md:right-0 md:top-10 md:h-auto md:w-48 md:origin-top-right md:overflow-hidden md:rounded-b transform opacity-100 bg-base-100">
                    <div className="my-3 ml-auto mr-3 flex aspect-square  md:hidden">
                      <Button
                        size="xs"
                        shape="circle"
                        color="ghost"
                        onClick={close}
                      >
                        ✕
                      </Button>
                    </div>
                    <div className="flex items-center px-2.5 pb-5 md:hidden">
                      <div className="flex-shrink-0 relative mr-4 ">
                        <img
                          src={userInfo?.headPic}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      </div>
                      <div className="w-full">
                        <div className="block text-base font-semibold uppercase">
                          {userInfo?.nickname}
                        </div>
                        <div className="flex mt-2 text-xs font-num gap-2">
                          <div className="text-green">
                            <span className="mr-1">$</span>
                            {numberFixed(userInfo?.balance || 0)}
                          </div>
                          <span className="text-purple">
                            <IconFont type="icon-coin" className="mr-1" />
                            {numberFixed(userInfo?.secondaryBalance || 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-neutral pb-2">
                      {menus}
                      <Button
                        className="btn btn-sm px-0 gap-0 w-full justify-start bg-transparent"
                        onClick={() => {
                          logout();
                        }}
                      >
                        <IconFont
                          type={'icon-logout'}
                          className="mx-5 md:mx-3 text-base"
                        />
                        <span className="capitalize text-sm">
                          <FormattedMessage id="mine_tcdl" />
                        </span>
                      </Button>
                    </div>
                  </div>
                </Transition>
              </Menu>
            </>
          ) : (
            <>
              <Button
                className="btn btn-sm text-black gap-1 rounded uppercase"
                onClick={() => {
                  showSteamLogin();
                  window?.fbq(
                    'trackSingleCustom',
                    '1024868335308144',
                    'click_LOGIN',
                  );
                }}
                style={{
                  background:
                    'linear-gradient(270deg, #0BFF59 0%, #B4FC3B 100%)',
                }}
              >
                <IconFont type="icon-steam" className="text-xl" />
                <FormattedMessage id="register_ljdl" />
              </Button>
              <Menu as="div" className="relative md:hidden">
                <Menu.Button as="div" className="py-1 px-2 bg-dark">
                  <MenuOutlined />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div className="fixed left-0 top-0 z-50 flex h-screen w-full origin-top flex-col overflow-scroll focus:outline-none md:absolute md:left-auto md:right-0 md:top-10 md:h-auto md:w-48 md:origin-top-right md:overflow-hidden md:rounded-b transform opacity-100 bg-base-100">
                    <div className="my-3 ml-auto mr-3 flex aspect-square  md:hidden">
                      <Button
                        size="xs"
                        shape="circle"
                        color="ghost"
                        onClick={close}
                      >
                        ✕
                      </Button>
                    </div>
                    <div className="bg-neutral py-2">{menus}</div>
                    <Button
                      className="btn btn-sm text-black gap-1 rounded uppercase mx-3 mt-4"
                      onClick={() => {
                        showSteamLogin();
                        window?.fbq(
                          'trackSingleCustom',
                          '1024868335308144',
                          'click_LOGIN',
                        );
                      }}
                      style={{
                        background:
                          'linear-gradient(270deg, #0BFF59 0%, #B4FC3B 100%)',
                      }}
                    >
                      <IconFont type="icon-steam" className="text-xl" />
                      <FormattedMessage id="register_ljdl" />
                    </Button>
                  </div>
                </Transition>
              </Menu>
            </>
          )}
        </div>
      </Navbar>
      <OpenHistory />
      {!hidePlacard() && <Placard />}
      {smsLoginShow && <MobileLogin />}
      {loginShow && <Login />}
      {registerShow && <Register />}
      {findPwdShow && <FindPwd />}
      {benefitShow && <Benefit />}
      {steamLoginShow && <LoginConfirm />}
      {loginTipShow && <LoginTip />}
    </div>
  );
}
