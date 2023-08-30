import WeaponCard from '@/components/weaponCard';
import {
  detailUsingGET,
  giftListUsingGET,
  partakeListUsingGET,
  partakeUsingPOST,
  winnerListUsingGET,
} from '@/services/front/ROLLfangxiangguan';
import { goback } from '@/utils';
import { LeftOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl, useParams, useRequest } from '@umijs/max';
import { useCountDown } from 'ahooks';
import { Skeleton } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Countdown, Input } from 'react-daisyui';
import { toast } from 'react-toastify';
import './index.less';
import Empty from '@/components/empty';

export default function Room() {
  const giveawayId = Number(useParams()?.id);
  const roomInfo = useRequest(
    () => giveawayId && detailUsingGET({ giveawayId }),
  );
  const giftList = useRequest(
    () => giveawayId && giftListUsingGET({ giveawayId }),
  );
  const userList = useRequest(
    () => giveawayId && partakeListUsingGET({ giveawayId }),
  );
  const winnerList = useRequest(
    () => giveawayId && winnerListUsingGET({ giveawayId }),
  );

  const [leftTime, setLeftTime] = useState(0);
  const [countdown, formattedRes] = useCountDown({
    leftTime: Number(leftTime),
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const intl = useIntl();

  const joinRoom = async () => {
    if (roomInfo?.data?.joinFlag) {
      return;
    }
    const pwd = inputRef.current?.value;
    if (roomInfo?.data?.pwdFlag) {
      if (!pwd) {
        toast.error(
          intl.formatMessage({
            id: 'roll_detail_qsrfjmm',
          }),
        );
        return;
      }
    }
    const ret = await partakeUsingPOST({
      pwd,
      giveawayId,
    });
    if (ret.status === 0) {
      toast.success('参与成功');
      roomInfo.refresh();
      userList.refresh();
    }
  };

  useEffect(() => {
    if (roomInfo?.data?.leftTime) {
      setLeftTime(roomInfo?.data?.leftTime);
    }
  }, [roomInfo.data]);

  const { days, hours, minutes, seconds } = formattedRes;

  return (
    <div className="max-w-[1400px] m-auto px-3">
      <div className="my-4">
        <div className="btn btn-sm btn-neutral" onClick={goback}>
          <LeftOutlined />
          <FormattedMessage id="common_back" />
        </div>
      </div>
      <div className="roll-room-info corner-icon p-4 sm:py-5 sm:px-7">
        <Skeleton
          loading={roomInfo?.loading}
          active
          round
          avatar={{
            size: 122,
            shape: 'circle',
          }}
          paragraph={{ rows: 1 }}
        >
          <div className="flex sm:justify-between flex-col sm:flex-row sm:gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start flex-1 gap-2 sm:gap-5">
              {roomInfo?.data?.banner && (
                <div className="avatar relative">
                  <div className="w-[122px] rounded">
                    <img src={roomInfo?.data?.banner} />
                  </div>
                </div>
              )}
              <div className="flex flex-col justify-center w-full h-full">
                <div className="flex flex-col gap-2">
                  <div className="text-center sm:text-left text-white">
                    {roomInfo?.data?.title}
                  </div>
                  <div className="  text-green text-xl">
                    {roomInfo?.data?.remark}
                  </div>
                </div>
              </div>
            </div>
            {roomInfo?.data && (
              <div className="flex gap-4 flex-col justify-center">
                {roomInfo?.data?.state === 1 &&
                  roomInfo?.data?.pwdFlag &&
                  !roomInfo?.data?.joinFlag && (
                    <Input
                      size="sm"
                      placeholder={intl.formatMessage({
                        id: 'roll_detail_qsrfjmm',
                      })}
                      ref={inputRef}
                    />
                  )}

                {roomInfo?.data?.state === 1 ? (
                  roomInfo?.data?.joinFlag ? (
                    <button
                      className="btn btn-secondary btn-sm rounded-none text-white"
                      type="button"
                    >
                      <FormattedMessage id="roll_ycy" />
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary btn-sm rounded-none "
                      onClick={joinRoom}
                      type="button"
                      style={{
                        background:
                          'linear-gradient(270deg, #0BFF59 0%, #B4FC3B 100%',
                      }}
                    >
                      <FormattedMessage id="roll_ljcy" />
                    </button>
                  )
                ) : (
                  <button
                    className="btn btn-sm rounded-none border-none"
                    type="button"
                    style={{ background: 'rgba(85, 88, 84, 0.80)' }}
                  >
                    <FormattedMessage id="roll_yjs" />
                  </button>
                )}
                {roomInfo?.data?.state === 1 ? (
                  <div className="font-mono flex justify-center items-center gap-1">
                    {days > 0 && (
                      <>
                        <div className="flex items-center text-sm">
                          <Countdown value={days} />
                          <span className="text-sm">d</span>
                        </div>
                        <div className="mx-0.5 text-center text-sm font-normal text-white">
                          :
                        </div>
                      </>
                    )}
                    <div className="flex items-center text-sm font">
                      <Countdown value={hours} />
                      <span className="text-sm">h</span>
                    </div>
                    <div className="mx-0.5 text-center text-xs font-normal text-white">
                      :
                    </div>
                    <div className="flex items-center text-sm">
                      <Countdown value={minutes} />
                      <span className="text-sm">m</span>
                    </div>
                    <div className="mx-0.5 text-center text-xs font-normal text-white">
                      :
                    </div>
                    <div className="flex items-center text-sm">
                      <Countdown value={seconds} />
                      <span className="text-sm">s</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm">{roomInfo?.data?.openTime}</div>
                )}
              </div>
            )}
          </div>
        </Skeleton>
      </div>
      <div className="flex gap-10 py-4 border-b border-light">
        <div>
          <div className="text-lg">Total Prizes Sum</div>
          <div className="text-xl text-green font-bold">
            ${roomInfo?.data?.accumulatedAmount}
          </div>
        </div>
        <div>
          <div className="text-lg">participants</div>
          <div className="text-xl text-green font-bold">
            {roomInfo?.data?.userCount}
          </div>
        </div>
        <div>
          <div className="text-lg">Prizes</div>
          <div className="text-xl text-green font-bold">
            {roomInfo?.data?.giftCount}
          </div>
        </div>
      </div>

      {roomInfo?.data?.state === 1 && (
        <>
          <div className="box-title mt-6">
            <span className="text-center text-base sm:text-2xl">
              <FormattedMessage id="roll_detail_jclb" />
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2">
            {giftList?.loading
              ? Array.from({ length: 7 }).map((_, i) => (
                  <WeaponCard key={i} loading />
                ))
              : Array.isArray(giftList?.data) &&
                giftList?.data?.map((item, i) => (
                  <WeaponCard key={i} data={item} />
                ))}
          </div>
          <div className="box-title mt-4 sm:mt-8">
            <span className="text-center text-base sm:text-2xl">
              <FormattedMessage id="roll_detail_cyyh" />
            </span>
          </div>
          <div className="flex flex-wrap justify-center  gap-4">
            {Array.from({ length: 6 }).map((item, i) => (
              <Skeleton
                loading={userList?.loading}
                active
                paragraph={false}
                title={false}
                avatar={{
                  size: 55,
                }}
                style={{
                  display: 'inline-block',
                  width: 'auto',
                }}
                key={i}
              ></Skeleton>
            ))}
            {Array.isArray(userList?.data) &&
              userList?.data?.map((item) => {
                return (
                  <div className="avatar" key={item.id}>
                    <div className="w-[45px] rounded-full relative">
                      <img src={item?.headPic} />
                    </div>
                  </div>
                );
              })}
            {userList?.data?.length === 0 && (
              <div className="text-center text-base-content text-opacity-50 w-full">
                <Empty />
              </div>
            )}
          </div>
        </>
      )}
      {winnerList?.data && winnerList?.data?.length > 0 && (
        <>
          <div className="box-title mt-4 sm:mt-8">
            <span className="text-center text-base sm:text-2xl">
              <FormattedMessage id="roll_detail_zjyh" />
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2">
            {winnerList.data?.map((item, i) => (
              <div className="flex flex-col relative group" key={i}>
                {item.giftVos?.[0] && (
                  <>
                    <div className="absolute w-full h-full top-0 left-0 z-[11] bg-black/70 flex flex-col items-center opacity-0  transition-opacity justify-center group-hover:opacity-100">
                      <div className="text-green">Winner</div>
                      <div className="w-[66px] h-[66px] rounded-full overflow-hidden mt-2 mb-1">
                        <img
                          src={item.giftVos?.[0]?.winnerInfo?.headPic}
                          alt=""
                        />
                      </div>
                      <div>{item.giftVos?.[0]?.winnerInfo?.nickname}</div>
                    </div>
                    <WeaponCard
                      key={i}
                      data={item.giftVos?.[0]}
                      isGiveawayWinList={true}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
