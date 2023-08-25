import verifyIcon from '@/assets/verify-icon.png';
import {
  FormattedMessage,
  Link,
  Outlet,
  useIntl,
  useLocation,
} from '@umijs/max';
import { useMemo } from 'react';

export default function ProvablyFair() {
  const location = useLocation();
  const intl = useIntl();
  const tabLinks = useMemo(() => {
    return [
      {
        title: <FormattedMessage id="provably_fair_config" />,
        link: '/profile/provably-fair/config',
      },
      {
        title: <FormattedMessage id="provably_fair_verify" />,
        link: '/profile/provably-fair/verify',
      },
    ];
  }, []);

  return (
    <div className="w-full">
      <div className="bg-neutral rounded p-5">
        <div className="text-xl font-bold uppercase flex gap-2 items-center">
          <img src={verifyIcon} className="w-10 h-10" />
          <FormattedMessage id="provably_fair_title" />
        </div>
        <div className="mt-5 space-y-5">
          <div
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage({ id: 'provably_fair_content' }),
            }}
          ></div>
        </div>
      </div>
      <div className="custom-tab flex mt-4">
        {tabLinks.map((item, index) => {
          const isActive = location.pathname.startsWith(item.link);

          return (
            <div
              className={`tab-item px-4 ${isActive ? 'tab-active' : ''}`}
              key={index}
            >
              <Link to={item.link} className="tab-item-c text-sm md:text-base">
                {item.title}
              </Link>
            </div>
          );
        })}
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
