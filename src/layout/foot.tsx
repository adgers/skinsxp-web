import AlipaySvg from '@/assets/alipay.svg';
import ByteCoinSvg from '@/assets/byte-coin.svg';
import VisaSvg from '@/assets/visa.svg';
import { IconFont } from '@/components/icons';
import { FormattedMessage, Link, useModel } from '@umijs/max';
import './index.less';

export default function Foot() {
  const { showLogin } = useModel('user');
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

  return (
    <footer className="bg-base-300 text-base-content mt-10">
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
        <div className="flex justify-between w-full py-8 border-t border-light border-opacity-70 px-6">
          <div>
            <div className="w-40">
              <img src={require('@/assets/wg-logo.png')} />
            </div>
            <div className="text-xs text-gray mt-6">
              © 2022—2023 WGSKINS.COM
            </div>
          </div>

          <div className="flex justify-end gap-1 sm:gap-4 flex-wrap">
            <a
              href="https://twitter.com/wgskins"
              rel="noreferrer"
              target="_blank"
            >
              <IconFont type="icon-X" className="text-[24px]" />
            </a>
            <a
              href="https://www.youtube.com/@WGskins/about"
              rel="noreferrer"
              target="_blank"
            >
              <IconFont type="icon-youtube" className="text-[24px]" />
            </a>
            <a
              href="https://www.facebook.com/wgskins?mibextid=9R9pXO"
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
            <a
              href="https://t.me/wgskin"
              rel="noreferrer"
              target="_blank"
            >
              <IconFont type="icon-telegram" className="text-[24px]" />
            </a>
            <a
              href="https://www.tiktok.com/@wgskinscom"
              rel="noreferrer"
              target="_blank"
            >
              <IconFont type="icon-tiktok" className="text-[24px]" />
            </a>
          </div>
        </div>
        <div className="grid  grid-flow-row sm:grid-flow-col w-full pb-8 px-4 gap-y-10">
          <div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <img src={VisaSvg} alt="" className="h-[20px]" />
              <img src={AlipaySvg} alt="" className="h-[20px]" />
              <img src={ByteCoinSvg} alt="" className="h-[20px]" />
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
              {/* <div
                onClick={() => {
                  showLogin();
                }}
                className="mt-4 text-transparent hover:text-gray"
              >
                login
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
