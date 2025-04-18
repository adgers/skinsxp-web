import ByteCoinSvg from '@/assets/byte-coin.svg';
import VisaSvg from '@/assets/visa.svg';
import { IconFont } from '@/components/icons';
import { FormattedMessage, Link, useModel } from '@umijs/max';
import './index.less';

export default function Foot() {
  const { showLogin, userInfo } = useModel('user');
  const { siteStat } = useModel('socket');
  // const [showDeposit, setShowDeposit] = useState(false);
  const footerTop = [
    {
      title: <FormattedMessage id="footer_collect" />,
      desc: <FormattedMessage id="footer_collect_content" />,
      icon: 'icon-collect1',
    },
    {
      title: <FormattedMessage id="footer_price" />,
      desc: <FormattedMessage id="footer_price_content" />,
      icon: 'icon-price',
    },
    {
      title: <FormattedMessage id="footer_drop" />,
      desc: <FormattedMessage id="footer_drop_content" />,
      icon: 'icon-drop',
    },
    {
      title: <FormattedMessage id="footer_fair" />,
      desc: <FormattedMessage id="footer_fair_content" />,
      icon: 'icon-fair1',
    },
    {
      title: <FormattedMessage id="footer_reward" />,
      desc: <FormattedMessage id="footer_reward_content" />,
      icon: 'icon-reward',
    },
  ];

  const onlineStatMap = [
    {
      title: <FormattedMessage id="site_online" />,
      value: 'activeSession',
      icon: 'icon-a-xinhao11',
    },
    // {
    //   title: <FormattedMessage id="site_users" />,
    //   value: 'userTotal',
    //   icon: 'icon-a-alluser',
    // },
    {
      title: <FormattedMessage id="main_tab_home" />,
      value: 'boxCnt',
      icon: 'icon-openedcase',
    },
    {
      title: <FormattedMessage id="main_tab_arena2" />,
      value: 'battleCnt',
      icon: 'icon-battle',
    },
    {
      title: <FormattedMessage id="main_tab_dream" />,
      value: 'upgradeCnt',
      icon: 'icon-upgrade',
    },
  ];

  let timer = null;
  let waitTime = 1000;
  let lastTime = new Date().getTime();
  let count = 0;

  const onBtmClick = () => {
    let currentTime = new Date().getTime();
    // 计算两次相连的点击时间间隔
    count = currentTime - lastTime < waitTime ? count + 1 : 1;
    lastTime = new Date().getTime();
    clearTimeout(timer);
    timer = setTimeout(function () {
      clearTimeout(timer);
      if (count > 4) {
        showLogin();
      }
    }, waitTime + 10);
  };

  // useEffect(() => {
  //   if (
  //     Number(userInfo?.firstRechargeRebate) > 0 &&
  //     !sessionStorage.getItem('showedDepositBanner')
  //   ) {
  //     setShowDeposit(true);
  //     sessionStorage.setItem('showedDepositBanner', 'true');
  //   }
  // }, [userInfo?.firstRechargeRebate]);

  return (
    <>
      {/* {showDeposit && (
        <div
          className="bg-[url('@/assets/footer-deposit.png')] w-full h-[80px] md:h-[140px] bg-no-repeat bg-cover  bg-center sticky left-0 bottom-[64px] md:bottom-0 mt-10 z-[199]"
          onClick={() => {
            history.push('/deposit');
          }}
        >
          <div
            className="w-5 md:w-10 h-5 md:h-10 rounded-full cursor-pointer absolute right-5 md:right-[80px] top:20px md:top-[30px]"
            onClick={(e) => {
              e.stopPropagation();
              setShowDeposit(false);
            }}
          >
            <img src={require('@/assets/footer-deposit-close.png')} alt="" />
          </div>
        </div>
      )} */}
      <footer className="bg-base-300 text-base-content mt-10 flex flex-col">
        <div className="bg-black w-full flex justify-center">
          <div className="max-w-8xl w-full relative grid grid-cols-2 gap-y-4 sm:flex justify-center items-center flex-wrap text-gray py-10">
            {onlineStatMap.map((item, index) => {
              return (
                <div key={index} className="flex items-center gap-3 px-10">
                  <IconFont
                    type={item.icon}
                    className="text-green text-[40px]"
                  />
                  <div className="flex flex-col text-gray text-sm uppercase">
                    {item.title}
                    <div className="text-white font-semibold text-lg">
                      {siteStat?.[item.value]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="max-w-8xl w-full m-auto relative">
          <div className="grid grid-cols-2 gap-y-4 sm:grid-cols-5 text-gray py-10">
            {footerTop.map((item, index) => {
              return (
                <div className="flex flex-col items-center" key={index}>
                  <IconFont type={item.icon} className="text-[32px] mb-3.5" />
                  <div className="flex flex-col items-center px-2  gap-2">
                    <div className="text-white text-sm m font-semibold">
                      {item.title}
                    </div>
                    <div className="text-center text-xs">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between flex-col md:flex-row w-full py-8 border-t border-light border-opacity-70 px-6">
            <div>
              <div className="w-40">
                <img src={require('@/assets/wg-logo.png')} />
              </div>
              <div className="text-xs text-gray mt-6">
                © 2022—2025 SKINSXP.COM
              </div>
              <div className="text-xs text-gray mt-1">
                SETP UP TECHNOLOGY PTE. LTD.（60 PAYA LEBARROAD #11-53 PAYA
                LEBAR SQUARE SINGAPORE）
              </div>
              <div className="text-xs text-gray mt-1 uppercase">
                ALL RIGHTS RESERVED. POWERED BY STEAM. NOT AFFILIATED WITH VALVE
                CORP.
              </div>
              <div className="text-xs text-gray mt-1">
                Tel: +1 {'('}503{')'}358-6160
              </div>
              <div className="text-xs text-gray mt-1">
                E-mail: bd@skinsxp.com
              </div>
            </div>

            <div className="flex justify-start md:justify-end mt-4 gap-1 sm:gap-4 flex-wrap">
              <a
                href="https://twitter.com/wgskins"
                rel="noreferrer"
                target="_blank"
              >
                <IconFont type="icon-X" className="text-[24px]" />
              </a>
              <a
                href="https://youtube.com/@WGskins?si=UwhJtVEFuX4j6WNd"
                rel="noreferrer"
                target="_blank"
              >
                <IconFont type="icon-youtube" className="text-[24px]" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61551644411431"
                rel="noreferrer"
                target="_blank"
              >
                <IconFont type="icon-facebook" className="text-[24px]" />
              </a>
              <a
                href="https://instagram.com/wgskinscom"
                rel="noreferrer"
                target="_blank"
              >
                <IconFont type="icon-ins" className="text-[24px]" />
              </a>
              <a href="https://t.me/wgskin" rel="noreferrer" target="_blank">
                <IconFont type="icon-telegram" className="text-[24px]" />
              </a>
              <a
                href="https://www.tiktok.com/@wgskinscom"
                rel="noreferrer"
                target="_blank"
              >
                <IconFont type="icon-tiktok" className="text-[24px]" />
              </a>
              <a
                href="https://discord.gg/aG67xJwWDH"
                rel="noreferrer"
                target="_blank"
              >
                <IconFont type="icon-discord" className="text-[24px]" />
              </a>
            </div>
          </div>
          <div className="grid  grid-flow-row sm:grid-flow-col w-full pb-8 px-4 gap-y-10">
            <div>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <img src={VisaSvg} alt="" className="h-[20px]" />
                <img
                  src={ByteCoinSvg}
                  alt=""
                  className="h-[20px]"
                  onClick={() => onBtmClick()}
                />
                <img
                  src={require('@/assets/pix.png')}
                  alt=""
                  className="h-[20px]"
                />
              </div>
            </div>

            <div className="grid grid-flow-row gap-y-10 mt-4 sm:mt-0 sm:grid-flow-col">
              <div className="flex flex-col gap-2">
                <span className="footer-title text-sm">
                  <FormattedMessage id="footer_services" />
                </span>
                <Link
                  className="link link-hover whitespace-nowrap text-sm w-fit"
                  to="/docs/help/52"
                  target="_blank"
                >
                  <FormattedMessage id="terms_of_service" />
                </Link>
                <Link
                  className="link link-hover whitespace-nowrap text-sm w-fit"
                  to="/docs/help/51"
                  target="_blank"
                >
                  <FormattedMessage id="privacy_policy" />
                </Link>
                <Link
                  className="link link-hover whitespace-nowrap text-sm w-fit"
                  to="/docs/help/53"
                  target="_blank"
                >
                  <FormattedMessage id="footer_disclaimer" />
                </Link>
                <Link
                  className="link link-hover whitespace-nowrap text-sm w-fit"
                  to="/docs/help/54"
                  target="_blank"
                >
                  <FormattedMessage id="footer_ddzz" />
                </Link>
                <Link
                  className="link link-hover whitespace-nowrap text-sm w-fit"
                  to="/docs/help"
                  target="_blank"
                >
                  <FormattedMessage id="mine_bzzx" />
                </Link>
              </div>

              <div className="flex flex-col gap-2">
                <span className="footer-title text-sm">
                  <FormattedMessage id="footer_company" />
                </span>
                <Link
                  className="link link-hover whitespace-nowrap text-sm w-fit"
                  to="/docs/help/50"
                  target="_blank"
                >
                  <FormattedMessage id="about_us" />
                </Link>
                <Link
                  className="link link-hover whitespace-nowrap text-sm w-fit"
                  to="/provably-fair"
                  target="_blank"
                >
                  <FormattedMessage id="provably_fair_title" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
