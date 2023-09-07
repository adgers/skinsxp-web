import { IconFont } from '@/components/icons';
import { FormattedMessage, Link, useLocation } from '@umijs/max';

export default function BtmNav() {
  const location = useLocation();
  const navs = [
    {
      title: <FormattedMessage id="main_tab_home" />,
      link: '/case',
      icon: 'icon-cases1',
    },
    {
      title: <FormattedMessage id="main_tab_arena" />,
      link: '/battle',
      icon: 'icon-battle',
    },
    {
      title: <FormattedMessage id="roll_room_title" />,
      link: '/giveaways',
      icon: 'icon-giveaway',
    },
    {
      title: <FormattedMessage id="main_tab_account" />,
      link: '/profile',
      icon: 'icon-online',
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
              className={`text-2xl ${isActive ? 'text-primary' : ''}`}
            />
            <span
              className={`btm-nav-label uppercase font-semibold mt-1 text-xs ${
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
