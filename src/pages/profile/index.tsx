import { getDefaultHeadPictureListUsingGET } from '@/services/common/tongyongxiangguan';
import {
  modifyNicknameUsingPOST,
  uploadAvatarV2UsingPOST,
} from '@/services/front/gerenzhongxinxiangguan';
import { headHidden, numberFixed } from '@/utils';
import { Link, Outlet, useIntl, useLocation, useModel } from '@umijs/max';
import { useRequest, useToggle } from 'ahooks';
import { useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import './index.less';

export default function User() {
  const { userInfo, getUser } = useModel('user');
  const [nickInputVisible, { toggle: toggleNick }] = useToggle(false);
  const [headPicModalVisible, { toggle: toggleHeadPic }] = useToggle(false);
  const location = useLocation();
  const [headPic, setHeadPic] = useState<string>();
  console.log('userInfo', userInfo);
  const intl = useIntl();

  const nickRef = useRef<HTMLInputElement>(null);
  const lvprocess =
    userInfo?.experiencePercentage &&
    numberFixed(userInfo?.experiencePercentage * 100, 2);

  const updateNick = async () => {
    const nickVal = nickRef?.current?.value;
    if (!nickVal) return;
    const ret = await modifyNicknameUsingPOST({ nickname: nickVal });
    if (ret.status === 0) {
      toggleNick();
      toast.success(intl.formatMessage({ id: 'mine_xgcg' }));
      getUser();
    }
  };

  const { data: headPicList } = useRequest(
    () => {
      if (headPicModalVisible) {
        return getDefaultHeadPictureListUsingGET();
      } else {
        return Promise.resolve({ data: [] });
      }
    },
    {
      refreshDeps: [headPicModalVisible],
    },
  );

  const updateHeadPic = async () => {
    if (!headPic) {
      return;
    }
    const ret = await uploadAvatarV2UsingPOST({
      headPic,
    });
    if (ret.status === 0) {
      toast.success(intl.formatMessage({ id: 'mine_xgcg' }));

      getUser();
      toggleHeadPic();
    }
  };

  const tabLinks = useMemo(() => {
    return [
      {
        title: 'Items',
        link: '/profile/bag',
      },
      {
        title: 'History',
        link: '/profile/history',
      },
      {
        title: 'AFFILIATE SYSTEM',
        link: '/profile/affiliate',
      },
    ];
  }, []);

  return (
    <div className="max-w-[1400px] m-auto px-3 mt-5">
      {!headHidden() && (
        <>
          <div className="p-3 sm:p-6 user-info bg-neutral user-info-bg flex flex-col lg:flex-row">
            <div className="flex gap-3 sm:gap-4 items-center pr-16 user-info-left relative py-2 w-full">
              <div className="w-16 h-16 md:w-[120px] md:h-[120px]  overflow-hidden group relative rounded-full border-1 border-solid border-light">
                <img
                  src={
                    userInfo?.headPic ||
                    'https://key-drop.com/uploads/skins/XANTARES1.png'
                  }
                  className="w-full h-full"
                />
              </div>
              <div className="flex flex-col gap-1 md:gap-2 flex-1 justify-center ">
                <div className="text-white text-base md:text-xl flex items-center gap-2">
                  <span>{userInfo?.nickname || '名字'}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold items-center">
                  <div>
                    <div className="text-white/70 text-sm font-normal">
                      Balance
                    </div>
                    <div className="text-green ">
                      ${userInfo?.balance || 111}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/70 text-sm font-normal">
                      Integral
                    </div>
                    <div className=" text-purple">
                      ${userInfo?.secondaryBalance || 111}
                    </div>
                  </div>
                  <div className="btn px-[8px] rounded-none border border-green text-green">
                    Add balance
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center gap-6 text-white pl-16 w-full">
              <div className="btn rounded-none border border-light h-8 w-4/5">
                Add Trade URL
              </div>
              <div className="btn rounded-none border border-green h-8 w-4/5">
                Steam
              </div>
            </div>
          </div>
          <div className="custom-tab w-full flex gap-8 overflow-y-hidden overflow-x-auto md:justify-evenly border-b border-[#45444B] my-2 md:my-4 hide-scrollbar">
            {tabLinks.map((item, index) => {
              const isActive = location.pathname.startsWith(item.link);
              return (
                <div
                  className={`${
                    isActive
                      ? 'text-green border-b-4 border-green'
                      : 'text-white '
                  } tab-item flex-shrink-0 h-full `}
                  key={index}
                >
                  <Link
                    to={item.link}
                    className="tab-item-c text-sm md:text-base flex gap-1 hover:text-primary"
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
  );
}
