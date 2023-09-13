import { Link, Outlet, useIntl, useLocation } from '@umijs/max';
import { useMemo } from 'react';

export default function ProvablyFair() {
  const location = useLocation();
  const intl = useIntl();
  const tabLinks = useMemo(() => {
    return [
      {
        title: intl.formatMessage({ id: 'doc_help' }),
        link: '/docs/help',
      },
      {
        title: intl.formatMessage({ id: 'doc_support' }),
        link: '/docs/support',
      },
    ];
  }, []);

  return (
    <div className="w-full px-3 max-w-[1400px] mx-auto">
      <div className="custom-tab flex mt-4 text-white justify-center border-b border-[#45444B] w-full h-[68px] relative">
        {tabLinks.map((item, index) => {
          const isActive = location.pathname.startsWith(item.link);

          return (
            <div
              className={`uppercase font-semibold px-4 flex items-center h-full ${
                isActive
                  ? 'text-green border-b-[1px] border-green'
                  : 'text-white '
              }`}
              key={index}
            >
              <Link to={item.link} className="text-sm md:text-base">
                {item.title}
              </Link>
            </div>
          );
        })}
      </div>

      <div className="w-full py-3">
        <Outlet />
      </div>
    </div>
  );
}
