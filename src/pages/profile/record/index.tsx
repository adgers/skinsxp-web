import { Link, Outlet, useLocation,useIntl } from '@umijs/max';
import { ConfigProvider, theme } from 'antd';
import { useMemo } from 'react';

export default function Record() {
  const location = useLocation();
  const intl = useIntl();

  const tabLinks = useMemo(() => {
    return [
      {
        title: intl.formatMessage({ id: 'game_record' }),
        link: '/profile/record/game',
      },
      {
        title: intl.formatMessage({ id: 'take_record' }),
        link: '/profile/record/take',
      },
      {
        title: intl.formatMessage({ id: 'flow_record' }),
        link: '/profile/record/flow',
      },
    ];
  }, []);

  return (
    <div className="w-full">
      <div className="custom-tab max-w-[700px] m-auto flex justify-evenly">
        {tabLinks.map((item, index) => {
          const isActive = location.pathname.startsWith(item.link);

          return (
            <div
              className={`tab-item ${isActive ? 'tab-active' : ''}`}
              key={index}
            >
              <Link to={item.link} className="tab-item-c text-sm md:text-base">
                {item.title}
              </Link>
            </div>
          );
        })}
      </div>
      <div className="max-w-6xl w-full m-auto">
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
          }}
          locale={{
            locale: 'en-US',
          }}
        >
          <Outlet />
        </ConfigProvider>
      </div>
    </div>
  );
}
