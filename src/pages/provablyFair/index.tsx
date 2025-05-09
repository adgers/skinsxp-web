import { IconFont } from '@/components/icons';
import { goback } from '@/utils';
import { LeftOutlined } from '@ant-design/icons';
import {
  FormattedMessage,
  Link,
  Outlet,
  useIntl,
  useLocation,
} from '@umijs/max';
import { useMemo } from 'react';
import RollCode from './code';
import './index.less';

export default function ProvablyFair() {
  const location = useLocation();
  const intl = useIntl();
  const tabLinks = useMemo(() => {
    return [
      {
        title: <FormattedMessage id="provably_fair_config" />,
        link: '/provably-fair/config',
      },
      {
        title: <FormattedMessage id="provably_fair_verify" />,
        link: '/provably-fair/verify',
      },
    ];
  }, []);

  return (
    <div className="w-full max-w-[1400px] m-auto verify-bg">
      <div className="my-5 flex w-full flex-col justify-between border-b-0 sm:border-b border-light lg:mb-0 lg:mt-8 lg:flex-row">
        <div className="-mb-px items-center border-b-0 sm:border-b border-green sm:pb-6 pr-6 font-semibold uppercase text-white flex gap-3">
          <div className="-my-2 text-white cursor-pointer" onClick={goback}>
            <LeftOutlined />
          </div>
          <FormattedMessage id="provably_fair_title" />
          <IconFont type="icon-shield" className="text-green text-2xl" />
        </div>
      </div>
      <div className="bg-black px-5 pb-5 text-white mt-4 max-w-4xl rounded-lg prose-base prose-slate overflow-hidden">
        <div
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage({ id: 'provably_fair_content' }),
          }}
          className='mt-4'
        ></div>

        <RollCode />
      </div>
      <div className="custom-tab flex mt-4 justify-center sm:justify-start text-white border-b border-[#45444B] w-full h-[68px]  max-w-4xl">
        {tabLinks.map((item, index) => {
          const isActive = location.pathname.startsWith(item.link);

          return (
            <div
              className={`tab-item uppercase font-semibold px-4 flex items-center h-full ${
                isActive
                  ? 'text-green border-b-[1px] border-green'
                  : 'text-white '
              }`}
              key={index}
            >
              <Link to={item.link} className="tab-item-c text-sm md:text-base">
                {item.title}
              </Link>
            </div>
          );
        })}
      </div>
      <div className="w-full px-2 sm:px-0">
        <Outlet />
      </div>
    </div>
  );
}
