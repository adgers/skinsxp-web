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

          <div className="flex justify-end gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a
              href="https://youtube.com/@WGskins?si=UwhJtVEFuX4j6WNd"
              rel="noreferrer"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/wgskins?mibextid=9R9pXO"
              rel="noreferrer"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
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
              <div onClick={() => showLogin()} className='mt-4 text-transparent hover:text-gray'>login</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
