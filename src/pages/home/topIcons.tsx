import icon1 from '@/assets/icon1.png';
import icon2 from '@/assets/icon2.png';
import icon3 from '@/assets/icon3.png';
import icon4 from '@/assets/icon4.png';
import icon5 from '@/assets/icon5.png';
import { FormattedMessage, Link, useModel } from '@umijs/max';
import './index.less';

export default function TopIcons() {
  const { showBenefit } = useModel('user');

  const icons = [
    {
      title: <FormattedMessage id="home_spsc" />,
      link: '/mall',
      icon: icon1,
    },
    {
      title: <FormattedMessage id="home_item_roll" />,
      link: '/roll',
      icon: icon2,
    },
    {
      title: <FormattedMessage id="mine_fllq" />,
      onclick: () => {
        showBenefit();
      },
      icon: icon3,
    },
    {
      title: <FormattedMessage id="home_item_hydj" />,
      link: '/user/vip',
      icon: icon4,
    },
    {
      title: <FormattedMessage id="home_item_hzhb" />,
      link: '/user/promote',
      icon: icon5,
    },
  ];

  return (
    <div className="w-[360px] md:w-[700px] mx-auto -mt-10 md:-mt-20 relative z-10">
      <div className="top-icons corner-icon px-3 md:px-8 py-2.5 md:py-5 grid grid-cols-5 border-base-100">
        {icons.map((t, i) =>
          t.link ? (
            <Link
              className="flex flex-col gap-2 items-center cursor-pointer"
              key={i}
              to={t.link}
            >
              <img src={t.icon} className="w-10 h-10 md:w-20 md:h-20"></img>
              <div className="text-xs md:text-sm uppercase truncate w-full text-center">
                {t.title}
              </div>
            </Link>
          ) : (
            <div
              className="flex flex-col gap-2 items-center cursor-pointer"
              key={i}
              onClick={t.onclick}
            >
              <img src={t.icon} className="w-10 h-10 md:w-20 md:h-20"></img>
              <div className="text-xs md:text-sm uppercase truncate w-full text-center">
                {t.title}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
