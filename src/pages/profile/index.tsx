import ModifySteamLink from '@/components/account/steamLink';
import { headHidden } from '@/utils';
import { Link, Outlet, useIntl, useLocation, useModel } from '@umijs/max';
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
        title: 'Items',
        link: '/profile/bag',
      },
      {
        title: 'History',
        link: '/profile/record',
      },
      {
        title: 'AFFILIATE SYSTEM',
        link: '/profile/affiliate',
      },
      {
        title: 'Provable Fair',
        link: '/profile/provably-fair',
      },
    ];
  }, []);

  return (
    <>
      <div className="max-w-[1400px] m-auto px-3 mt-5 mb-5 lg:mb-0">
        {!headHidden() && (
          <>
            <div className="p-3 sm:p-6 user-infobg-dark user-info-bg flex flex-col lg:flex-row">
              <div className="flex gap-3 sm:gap-4 items-center pr-16 user-info-left relative py-2 w-full">
                <div className="w-16 h-16 md:w-[120px] md:h-[120px]  overflow-hidden group relative rounded-full border-1 border-solid border-light">
                  <img src={userInfo?.headPic} className="w-full h-full" />
                </div>
                <div className="flex flex-col gap-1 md:gap-2 flex-1 justify-center ">
                  <div className="text-white text-base md:text-xl flex items-center gap-2">
                    <span>{userInfo?.nickname || '名字'}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold items-center">
                    <div className=" lg:w-fit">
                      <div className="text-white/70 text-sm font-normal">
                        Balance
                      </div>
                      <div className="text-green  truncate">
                        ${userInfo?.balance}
                      </div>
                    </div>
                    <div className=" lg:w-fit">
                      <div className="text-white/70 text-sm font-normal">
                        Integral
                      </div>
                      <div className=" text-purple truncate">
                        ${userInfo?.secondaryBalance}
                      </div>
                    </div>
                    <div className="btn px-[8px] rounded-none border border-green text-green disp invisible xl:visible ">
                      Add balance
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-center gap-6 text-white pl-16 w-full">
                <div
                  className="btn rounded-none border border-light h-8 w-4/5"
                  onClick={() => setSteamLinkModalVisible(true)}
                >
                  {userInfo?.tradeUrl? 'Edit Trade URL':'Add Trade URL'}
                </div>
                <div className="btn rounded-none border border-green h-8 w-4/5">
                  Steam
                </div>
              </div>
            </div>
            <div className="custom-tab w-full h-[68px] flex gap-[100px] overflow-y-hidden overflow-x-auto md:justify-start items-center border-b border-[#45444B] my-2 md:my-4 hide-scrollbar">
              {tabLinks.map((item, index) => {
                const isActive = location.pathname.startsWith(item.link);
                return (
                  <div
                    className={`${
                      isActive
                        ? 'text-green border-b-[1px] border-green'
                        : 'text-white '
                    } tab-item flex-shrink-0 h-full flex items-center `}
                    key={index}
                  >
                    <Link
                      to={item.link}
                      className="tab-item-c text-sm md:text-base flex gap-1 hover:text-green"
                    >
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
