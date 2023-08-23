import { IconFont } from '@/components/icons';
import { getDefaultHeadPictureListUsingGET } from '@/services/common/tongyongxiangguan';
import {
  modifyNicknameUsingPOST,
  uploadAvatarV2UsingPOST,
} from '@/services/front/gerenzhongxinxiangguan';
import { getImgHost, headHidden, numberFixed } from '@/utils';
import { FormOutlined } from '@ant-design/icons';
import {
  FormattedMessage,
  Link,
  Outlet,
  useIntl,
  useLocation,
  useModel,
} from '@umijs/max';
import { useRequest, useToggle } from 'ahooks';
import { useMemo, useRef, useState } from 'react';
import CountUp from 'react-countup';
import { Button, Input, Modal } from 'react-daisyui';
import { toast } from 'react-toastify';
import './index.less';

export default function User() {
  const { userInfo, getUser } = useModel('user');
  const [nickInputVisible, { toggle: toggleNick }] = useToggle(false);
  const [headPicModalVisible, { toggle: toggleHeadPic }] = useToggle(false);
  const location = useLocation();
  const [headPic, setHeadPic] = useState<string>();

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
        title: <FormattedMessage id="mine_spbb" />,
        link: '/user/bag',
        icon: 'icon-beibao1',
      },
      {
        title: <FormattedMessage id="mine_jlzx" />,
        link: '/user/record',
        icon: 'icon-jilu',
      },
      {
        title: <FormattedMessage id="home_item_hydj" />,
        link: '/user/vip',
        icon: 'icon-vip',
      },
      {
        title: <FormattedMessage id="home_item_hzhb" />,
        link: '/user/promote',
        icon: 'icon-tuiguang',
      },
      {
        title: <FormattedMessage id="mine_gpyz" />,
        link: '/user/provably-fair',
        icon: 'icon-shield',
      },
      {
        title: <FormattedMessage id="mine_bzzx" />,
        link: '/user/docs',
        icon: 'icon-help',
      },
      {
        title: <FormattedMessage id="mine_zhsz" />,
        link: '/user/info',
        icon: 'icon-bianji1',
      },
    ];
  }, []);

  return (
    <div className="max-w-[1400px] m-auto px-3 mt-5">
      {!headHidden() && (
        <>
          <div className="p-3 sm:p-6 user-info bg-neutral user-info-bg">
            <div className="flex gap-3 sm:gap-4 items-center">
              <div className="w-16 h-16 md:w-[120px] md:h-[120px] overflow-hidden group relative rounded">
                <img src={userInfo?.headPic} className="w-full h-full" />
                <img
                  src={userInfo?.headGround}
                  className="absolute left-0 top-0 w-full h-full"
                />
                <span
                  className="absolute w-full left-0 bottom-0 text-center text-white opacity-60 py-2 text-sm bg-black bg-opacity-80 cursor-pointer hidden group-hover:block"
                  onClick={() => {
                    toggleHeadPic();
                  }}
                >
                  <FormattedMessage id="mine_xgtx" />,
                </span>

                <Modal open={headPicModalVisible} className="max-w-md">
                  <Modal.Header className="uppercase font-semibold leading-tight">
                    <FormattedMessage id="mine_xztx" />,
                  </Modal.Header>
                  <Button
                    size="xs"
                    shape="circle"
                    color="ghost"
                    className="absolute right-2 top-2"
                    onClick={toggleHeadPic}
                  >
                    ✕
                  </Button>
                  <Modal.Body className="grid grid-cols-4 md:grid-cols-5 gap-2">
                    {headPicList?.data?.map((item, i) => (
                      <img
                        src={getImgHost() + item}
                        className={`w-16 h-16 overflow-hidden group relative rounded-sm cursor-pointer ${
                          item === headPic && 'ring-1 ring-primary'
                        }`}
                        onClick={() => setHeadPic(item)}
                        key={i}
                      />
                    ))}
                  </Modal.Body>
                  <Modal.Actions className="flex mt-4">
                    <Button
                      className="btn-primary w-full rounded"
                      onClick={updateHeadPic}
                    >
                      <FormattedMessage id="confirm" />
                    </Button>
                  </Modal.Actions>
                </Modal>
              </div>
              <div className="flex flex-col gap-1 md:gap-2 flex-1 justify-center">
                <div className="text-white text-base md:text-2xl flex items-center gap-2">
                  <span>{userInfo?.nickname}</span>
                  <FormOutlined className="text-sm" onClick={toggleNick} />

                  <Modal open={nickInputVisible} className="max-w-md">
                    <Modal.Header className="uppercase font-semibold leading-tight">
                      <FormattedMessage id="mine_xgnc" />,
                    </Modal.Header>
                    <Button
                      size="xs"
                      shape="circle"
                      color="ghost"
                      className="absolute right-2 top-2"
                      onClick={toggleNick}
                    >
                      ✕
                    </Button>
                    <Modal.Body className="flex flex-col gap-4">
                      <Input
                        placeholder="Enter new nickname"
                        ref={nickRef}
                        defaultValue={userInfo?.nickname}
                      />
                    </Modal.Body>
                    <Modal.Actions className="flex flex-col mt-4">
                      <Button
                        className="btn-primary w-full rounded"
                        onClick={updateNick}
                      >
                        <FormattedMessage id="confirm" />
                      </Button>
                    </Modal.Actions>
                  </Modal>

                  <div className="vip-level">
                    <div className="vip-level-icon"></div>
                    <div className="vip-level-num">{userInfo?.grade}</div>
                  </div>
                </div>
                <div className="text-white text-xs md:text-sm flex items-center flex-wrap gap-2">
                  <div className="flex flex-1 gap-2 items-center">
                    <progress
                      className="progress progress-secondary-l ring-1 ring-secondary bg-base-100 w-32"
                      value={lvprocess}
                      max="100"
                    ></progress>
                    <span>{lvprocess}%</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-sm sm:text-base">
                    <IconFont type="icon-coin" />
                    <CountUp
                      end={numberFixed(userInfo?.balance || 0)}
                      duration={1}
                      decimals={2}
                      separator=""
                      className="font-num"
                    />
                  </div>
                  <div className="flex items-center gap-1 text-sm sm:text-base">
                    <IconFont type="icon-daimond" />
                    <CountUp
                      end={numberFixed(userInfo?.secondaryBalance || 0)}
                      duration={1}
                      decimals={2}
                      separator=""
                      className="font-num"
                    />
                  </div>
                </div>
                <div className="flex uppercase">
                  SteamID: {userInfo?.steamId || '-'}
                </div>
              </div>
            </div>
          </div>
          <div className="custom-tab w-full flex gap-8 overflow-y-hidden overflow-x-auto md:justify-evenly border-b border-[#45444B] my-2 md:my-4 hide-scrollbar">
            {tabLinks.map((item, index) => {
              const isActive = location.pathname.startsWith(item.link);
              return (
                <div
                  className={`tab-item flex-shrink-0 ${
                    isActive ? 'tab-active' : ''
                  }`}
                  key={index}
                >
                  <Link
                    to={item.link}
                    className="tab-item-c text-sm md:text-base flex gap-1 hover:text-primary"
                  >
                    <IconFont type={item.icon} />
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
