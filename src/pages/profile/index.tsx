import ModifySteamLink from '@/components/account/steamLink';
import { IconFont } from '@/components/icons';
import { headHidden } from '@/utils';
import {
  FormattedMessage,
  Link,
  Outlet,
  history,
  useIntl,
  useLocation,
  useModel,
} from '@umijs/max';
import { useMemo, useState } from 'react';
import './index.less';

export default function User() {
  const { userInfo, getUser } = useModel('user');
  const [steamLinkModalVisible, setSteamLinkModalVisible] = useState(false);
  const location = useLocation();
  const intl = useIntl();

  const tabLinks = useMemo(() => {
    return [
      {
        title: <FormattedMessage id="mine_spbb" />,
        link: '/profile/bag',
        icon: 'icon-cases',
      },
      {
        title: <FormattedMessage id="history_record" />,
        link: '/profile/record',
        icon: 'icon-history',
      },
      {
        title: <FormattedMessage id="home_item_hzhb" />,
        link: '/profile/partner',
        icon: 'icon-partner',
      },
      {
        title: <FormattedMessage id="mine_gpyz" />,
        link: '/provably-fair',
        icon: 'icon-shield',
      },
      {
        title: <FormattedMessage id="mine_bzzx" />,
        link: '/docs',
        icon: 'icon-support',
      },
    ];
  }, []);

  return (
    <>
      <div className="max-w-[1400px] m-auto px-3 mt-5 mb-5 lg:mb-0">
        {!headHidden() && (
          <>
            <div className="p-3 sm:p-6 user-info bg-dark user-info-bg flex flex-col lg:flex-row">
              <div className="flex gap-3 sm:gap-4 items-center lg:pr-16 user-info-left relative py-2 w-full">
                <div className="w-16 h-16 md:w-[120px] md:h-[120px]  overflow-hidden group relative rounded-full border-1 border-solid border-light flex-shrink-0">
                  <img src={userInfo?.headPic} className="w-full h-full" />
                </div>
                <div className="flex flex-col gap-1 md:gap-2 flex-1 justify-center overflow-hidden">
                  <div className="text-white text-base md:text-xl flex items-center gap-2">
                    <span>{userInfo?.nickname}</span>
                  </div>
                  <div className="flex justify-between text-xl font-semibold items-center gap-2 w-full">
                    <div className=" lg:w-fit">
                      <div className="text-white/70 text-sm font-normal mb-1">
                        <FormattedMessage id="balanceAfter" />
                      </div>
                      <div className="text-green  truncate font-num">
                        ${userInfo?.balance}
                      </div>
                    </div>
                    <div className="lg:w-fit">
                      <div className="text-white/70 text-sm font-normal mb-1">
                        <FormattedMessage id="profile_integral" />
                      </div>
                      <div className="text-purple truncate font-num">
                        <IconFont
                          type="icon-coin"
                          className="text-purple mr-1"
                        />

                        {userInfo?.secondaryBalance}
                      </div>
                    </div>
                    <div
                      className="btn px-[16px] rounded border border-green text-green disp invisible xl:visible "
                      onClick={() => {
                        history.push({
                          pathname: '/deposit',
                          search: location.search,
                        });
                        window?.fbq(
                          'trackSingleCustom',
                          '1024868335308144',
                          'InitiateCheckout',
                        );
                        window?.gtag('event', 'conversion', {
                          send_to: 'AW-11345409756/EOFKCIqQy-UYENzt9KEq',
                        });
                      }}
                    >
                      <IconFont type="icon-funds" className="text-xl" />
                      <FormattedMessage id="wc_rewards_deposit" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-start justify-center gap-3 sm:gap-6 text-white sm:pl-16 w-full">
                <div
                  className="btn rounded border border-light h-8 w-4/5"
                  onClick={() => setSteamLinkModalVisible(true)}
                >
                  <IconFont type="icon-steam" />
                  {userInfo?.tradeUrl ? (
                    <FormattedMessage id="trade_url_edit" />
                  ) : (
                    <FormattedMessage id="trade_url_add" />
                  )}
                </div>
              </div>
            </div>
            <div className="w-full h-[68px] flex gap-10 overflow-y-hidden overflow-x-auto md:justify-start items-center border-b border-[#45444B] my-2 md:my-4 hide-scrollbar">
              {tabLinks.map((item, index) => {
                const isActive = location.pathname.startsWith(item.link);
                return (
                  <div
                    className={`${
                      isActive
                        ? 'text-green border-b-[1px] border-green'
                        : 'text-white '
                    } flex-shrink-0 h-full flex items-center uppercase font-semibold`}
                    key={index}
                  >
                    <Link
                      to={item.link}
                      className="text-sm md:text-base flex gap-2 hover:text-green px-2"
                    >
                      <IconFont type={item.icon} className="text-lg" />
                      {item.title}
                    </Link>
                  </div>
                );
              })}
            </div>
          </>
        )}
        <>
          <Outlet />
        </>
      </div>
      <ModifySteamLink
        onSuccess={() => {
          getUser();
          setSteamLinkModalVisible(false);
        }}
        onClose={() => {
          setSteamLinkModalVisible(false);
        }}
        open={steamLinkModalVisible}
      />
    </>
  );
}
