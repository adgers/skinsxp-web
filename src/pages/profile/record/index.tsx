import { Outlet, useIntl, useLocation } from '@umijs/max';
import { ConfigProvider, theme } from 'antd';
import { useMemo } from 'react';

export default function Record() {
  const location = useLocation();
  const intl = useIntl();

  const tabLinks = useMemo(() => {
    return [
      {
        title: intl.formatMessage({ id: 'flow_record' }),
        link: '/profile/record/flow',
      },
    ];
  }, []);

  return (
    <div className="w-full">
      <div className=" w-full m-auto">
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
          }}
        >
          <Outlet />
        </ConfigProvider>
      </div>
    </div>
  );
}
