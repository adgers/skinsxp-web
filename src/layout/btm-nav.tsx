import { IconFont } from '@/components/icons';
import { FormattedMessage, Link, useLocation } from '@umijs/max';

export default function BtmNav() {
  const location = useLocation();
  const navs = [
    {
      title: <FormattedMessage id="main_tab_home" />,
      link: '/home',
      icon: 'icon-home',
    },
    {
      title: <FormattedMessage id="main_tab_dream" />,
      link: '/dream',
      icon: 'icon-zhuimeng',
    },
    {
      title: <FormattedMessage id="main_tab_arena" />,
      link: '/battle',
      icon: 'icon-zhandou',
    },
    {
      title: <FormattedMessage id="home_spsc" />,
      link: '/mall',
      icon: 'icon-mall',
    },
    {
      title: <FormattedMessage id="main_tab_account" />,
      link: '/user',
      icon: 'icon-zhanghu',
    },
  ];

  return (
    <div className="btm-nav md:hidden z-50">
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
