import { IconFont } from '@/components/icons';
import { FormattedMessage, Link, useLocation } from '@umijs/max';

export default function BtmNav() {
  const location = useLocation();
  const navs = [
    {
      title: <FormattedMessage id="main_tab_home" />,
      link: '/case',
      icon: 'icon-case2',
    },
    {
      title:  <FormattedMessage id="home_spsc" />,
      link: '/store',
      icon: 'icon-market2',
    },
    {
      title: <FormattedMessage id="roll_room_title" />,
      link: '/giveaways',
      icon: 'icon-giveaway2',
    },
    {
      title: <FormattedMessage id="main_tab_arena" />,
      link: '/battle',
      icon: 'icon-a-battle2',
    },
    {
      title: <FormattedMessage id="main_tab_account" />,
      link: '/profile',
      icon: 'icon-account2',
    },
  ];

  return (
    <div className="btm-nav bg-base-300  md:hidden z-50">
      {navs.map((t, i) => {
        const isActive = location.pathname.startsWith(t.link);

        return (
          <Link to={t.link} key={i}>
            <IconFont
              type={t.icon}
              className={`text-2xl text-gray ${isActive ? 'text-primary' : ''}`}
            />
            <span
              className={`btm-nav-label uppercase  text-gray font-semibold mt-1 text-xs whitespace-nowrap ${
                isActive ? 'text-primary' : ''
              }`}
            >
              {t.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
