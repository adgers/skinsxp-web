import FindPwd from '@/components/account/findPwd';
import Login from '@/components/account/login';
import MobileLogin from '@/components/account/mobileLogin';
import Register from '@/components/account/register';
import Benefit from '@/pages/benefit';
import { getSteamLoginUrl, logout, numberFixed } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
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
import { Fragment } from 'react';
import { Button, Navbar } from 'react-daisyui';
import './index.less';
import OpenHistory from './open-history';
import Placard from './placard';

import brFlag from '@/assets/flags/br.svg';
import cnFlag from '@/assets/flags/cn.svg';
import enFlag from '@/assets/flags/en.svg';
import { IconFont } from '@/components/icons';
import CountUp from 'react-countup';

export default function Header() {
  const {
    showLogin,
    userInfo,
    smsLoginShow,
    registerShow,
    loginShow,
    findPwdShow,
    benefitShow,
    showBenefit,
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

  const langs = [
    {
      title: 'EN',
      value: 'en-US',
      flag: enFlag,
    },
    {
      title: 'BR',
      value: 'pt-BR',
      flag: brFlag,
    },
    {
      title: 'CN',
      value: 'zh-CN',
      flag: cnFlag,
    },
  ];

  const headLinks = [
    // {
    //   title: <FormattedMessage id="main_tab_dream" />,
    //   link: '/dream',
    //   icon: 'icon-zhuimeng',
    // },
    {
      title: <FormattedMessage id="main_tab_arena" />,
      link: '/battle',
      icon: 'icon-zhandou',
    },
    {
      title: <FormattedMessage id="home_spsc" />,
      link: '/shop',
      icon: 'icon-mall',
    },
    {
      title: <FormattedMessage id="roll_room_title" />,
      link: '/giveaways',
      icon: 'icon-roll',
    },
  ];

  const headExt = [
    {
      title: <FormattedMessage id="home_item_hzhb" />,
      link: '/profile/promote',
      icon: 'icon-tuiguang',
    },
  ];

  const menuLinks = [
    {
      title: <FormattedMessage id="mine_spbb" />,
      link: '/profile/bag',
      icon: 'icon-beibao1',
    },
    {
      title: <FormattedMessage id="mine_jlzx" />,
      link: '/profile/record',
      icon: 'icon-jilu',
    },
    ...headExt,
    {
      title: <FormattedMessage id="mine_zhsz" />,
      link: '/user',
      icon: 'icon-bianji1',
    },
  ];

  const customLinks = [
    {
      title: <FormattedMessage id="mine_bzzx" />,
      link: '/profile/docs',
      icon: 'icon-help',
    },
    {
      title: <FormattedMessage id="mine_gpyz" />,
      link: '/profile/provably-fair',
      icon: 'icon-shield',
    },
  ];

  return (
    <div className="sticky left-0 top-0 z-[99]">
      <Navbar className="p-3 bg-dark">
        <div className="flex-1">
          <Link to={'/'} className="logo text-2xl sm:text-[38px]">
            WGSKINS
          </Link>

          <Menu as="div" className="relative ml-4">
            <Menu.Button className="select select-xs select-accent flex items-center border-opacity-50 rounded uppercase font-semibold focus:outline-nonebg-dark">
              {langs.filter((item) => item.value === locale)[0].title}
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
              <Menu.Items className="z-50 flex flex-col focus:outline-none absolute left-0 top-8 h-auto overflow-hidden origin-top-right rounded transform opacity-100 bg-dark w-full">
                {langs.map((item, i) => (
                  <Menu.Item key={i}>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? 'bg-accent bg-opacity-10' : ''
                        } flex justify-between items-center px-2 py-1 text-xs rounded cursor-pointer`}
                        onClick={() => changeConfirmLocale(item.value)}
                      >
                        <img src={item.flag} className="w-5 h-5" />
                        <span>{item.title}</span>
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>

          <div className="hidden lg:flex ml-4">
            {[...headLinks, ...headExt].map((item, i) => {
              const isActive = location.pathname.startsWith(item.link);
              return (
                <Link
                  key={i}
                  to={item.link}
                  className={`px-3 py-2 uppercase transition-colors font-semibold duration-200 text-white hover:text-green text-sm rounded-md ${
                    isActive ? 'text-green' : ''
                  }`}
                >
                  {item.icon && <IconFont type={item.icon} className="mr-1" />}
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex-none flex gap-3">
          {userInfo ? (
            <>
              <div className="flex flex-col text-xs font-num ">
                <span className='text-green'>
                  $<CountUp
                    end={numberFixed(userInfo?.balance || 0)}
                    duration={1}
                    decimals={2}
                    separator=""
                    className="font-num"
                  />
                </span>
                <span className='text-purple'>
                  <IconFont type="icon-daimond" className="mr-1" />
                  <CountUp
                    end={numberFixed(userInfo?.secondaryBalance || 0)}
                    duration={1}
                    decimals={2}
                    separator=""
                    className="font-num"
                  />
                </span>
              </div>
              <Link className="btn-green !btn-sm !px-1" to="/deposit">
                <IconFont type="icon-qianbao" className="text-xl text-green" />
                <PlusOutlined className="text-xs text-green" />
              </Link>

              <Menu as="div" className="relative h-8">
                <Menu.Button as="div" className="avatar">
                  <div className="w-8 rounded-sm cursor-pointer relative">
                    <img src={userInfo.headPic} />
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
                          className="h-12 w-12 rounded object-cover"
                        />
                      </div>
                      <div className="w-full">
                        <div className="block text-base font-semibold uppercase">
                          {userInfo?.nickname}
                        </div>
                        <div className="flex mt-2 text-xs font-num gap-2">
                          <span>
                            <IconFont
                              type="icon-coin"
                              className="mr-1 text-primary"
                            />
                            {numberFixed(userInfo?.balance || 0)}
                          </span>
                          <span>
                            <IconFont type="icon-daimond" className="mr-1" />
                            {numberFixed(userInfo?.secondaryBalance || 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-neutral">
                      <Menu.Items className="outline-none">
                        {menuLinks.map((link, i) => (
                          <Menu.Item key={i}>
                            {({ active }) => (
                              <Link
                                className={`${
                                  active ? 'bg-accent bg-opacity-10' : ''
                                } flex items-center py-2 rounded cursor-pointer`}
                                to={link.link}
                              >
                                {link.icon && (
                                  <IconFont
                                    type={link.icon}
                                    className="mx-5 md:mx-3 text-xl md:text-base"
                                  />
                                )}
                                <span className="text-base capitalize md:text-sm">
                                  {link.title}
                                </span>
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>

                      <Menu.Items className="outline-none">
                        {customLinks.map((link, i) => (
                          <Menu.Item key={i}>
                            {({ active }) => (
                              <Link
                                className={`${
                                  active ? 'bg-accent bg-opacity-10' : ''
                                } flex items-center py-2 rounded cursor-pointer`}
                                to={link.link}
                              >
                                {link.icon && (
                                  <IconFont
                                    type={link.icon}
                                    className="mx-5 md:mx-3 text-xl md:text-base"
                                  />
                                )}
                                <span className="text-base capitalize md:text-sm">
                                  {link.title}
                                </span>
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className={`${
                                active ? 'bg-accent bg-opacity-10' : ''
                              } flex items-center py-2 rounded cursor-pointer`}
                              onClick={showBenefit}
                            >
                              <IconFont
                                type="icon-hongbao"
                                className="mx-5 md:mx-3 text-xl md:text-base"
                              />
                              <span className="text-base capitalize md:text-sm">
                                <FormattedMessage id="mine_fllq" />
                              </span>
                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className={`${
                                active ? 'bg-accent bg-opacity-10' : ''
                              } flex items-center py-2 rounded cursor-pointer`}
                              onClick={logout}
                            >
                              <IconFont
                                type={'icon-tuichu'}
                                className="mx-5 md:mx-3 text-xl md:text-base"
                              />
                              <span className="text-base capitalize md:text-sm">
                                <FormattedMessage id="mine_tcdl" />
                              </span>
                            </div>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </div>
                  </div>
                </Transition>
              </Menu>
            </>
          ) : (
            <>
              <Button className="btn btn-sm uppercase" onClick={showLogin}>
                pwd login
              </Button>
              <Button
                className="btn btn-sm text-black gap-1 rounded uppercase"
                onClick={() => (window.location.href = getSteamLoginUrl())}
                style={{
                  background:
                    'linear-gradient(270deg, #0BFF59 0.04%, #B4FC3B 99.77%)',
                }}
              >
                <IconFont type="icon-steam1" className="text-xl" />
                <FormattedMessage id="register_ljdl" />
              </Button>
              {/* <Menu as="div" className="relative  md:hidden">
                <Menu.Button as="div">
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
                    <div className="bg-neutral">
                      <Menu.Items className="outline-none">
                        {menuLinks.map((link, i) => (
                          <Menu.Item key={i}>
                            {({ active }) => (
                              <Link
                                className={`${
                                  active ? 'bg-accent bg-opacity-10' : ''
                                } flex items-center py-2 rounded cursor-pointer`}
                                to={link.link}
                              >
                                {link.icon && (
                                  <IconFont
                                    type={link.icon}
                                    className="mx-5 md:mx-3 text-xl md:text-base"
                                  />
                                )}
                                <span className="text-base capitalize md:text-sm">
                                  {link.title}
                                </span>
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                      <div className="my-2 mx-5 md:mx-3 text-xs uppercase md:hidden">
                        Games
                      </div>
                      <Menu.Items className="outline-none md:hidden">
                        {headLinks.map((link, i) => (
                          <Menu.Item key={i}>
                            {({ active }) => (
                              <Link
                                className={`${
                                  active ? 'bg-accent bg-opacity-10' : ''
                                } flex items-center py-2 rounded cursor-pointer`}
                                to={link.link}
                              >
                                {link.icon && (
                                  <IconFont
                                    type={link.icon}
                                    className="mx-5 md:mx-3 text-xl md:text-base"
                                  />
                                )}
                                <span className="text-base capitalize md:text-sm">
                                  {link.title}
                                </span>
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                      <div className="my-2 mx-5 md:mx-3 text-xs uppercase">
                        Customer service
                      </div>
                      <Menu.Items className="outline-none">
                        {customLinks.map((link, i) => (
                          <Menu.Item key={i}>
                            {({ active }) => (
                              <Link
                                className={`${
                                  active ? 'bg-accent bg-opacity-10' : ''
                                } flex items-center py-2 rounded cursor-pointer`}
                                to={link.link}
                              >
                                {link.icon && (
                                  <IconFont
                                    type={link.icon}
                                    className="mx-5 md:mx-3 text-xl md:text-base"
                                  />
                                )}
                                <span className="text-base capitalize md:text-sm">
                                  {link.title}
                                </span>
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className={`${
                                active ? 'bg-accent bg-opacity-10' : ''
                              } flex items-center py-2 rounded cursor-pointer`}
                              onClick={showBenefit}
                            >
                              <IconFont
                                type="icon-hongbao"
                                className="mx-5 md:mx-3 text-xl md:text-base"
                              />
                              <span className="text-base capitalize md:text-sm">
                                <FormattedMessage id="mine_fllq" />
                              </span>
                            </div>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </div>
                    <Button
                      className="btn btn-sm md:hidden btn-primary rounded uppercase mx-3 mt-4"
                      onClick={() =>
                        (window.location.href = getSteamLoginUrl())
                      }
                    >
                      <IconFont type="icon-steam1" className="text-xl" />
                      Log in
                    </Button>
                  </div>
                </Transition>
              </Menu> */}
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
    </div>
  );
}
