import { Link, Outlet, useLocation ,useIntl} from '@umijs/max';
import { useMemo } from 'react';

export default function ProvablyFair() {
  const location = useLocation();
  const intl = useIntl();
  const tabLinks = useMemo(() => {
    return [
      {
        title: intl.formatMessage({ id: 'doc_help' }),
        link: '/user/docs/help',
      },
      {
        title: intl.formatMessage({ id: 'doc_support' }),
        link: '/user/docs/support',
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

      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
