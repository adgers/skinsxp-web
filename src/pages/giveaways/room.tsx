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

export default function Room() {
  const rollId = Number(useParams()?.id);
  const roomInfo = useRequest(() => rollId && detailUsingGET({ rollId }));
  const giftList = useRequest(() => rollId && giftListUsingGET({ rollId }));
  const userList = useRequest(() => rollId && partakeListUsingGET({ rollId }));
  const winnerList = useRequest(() => rollId && winnerListUsingGET({ rollId }));

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
      rollId,
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
            size: 144,
            shape: 'square',
          }}
          paragraph={{ rows: 1 }}
        >
          <div className="absolute right-4 top-4">
            <div className="text-secondary text-right text-sm sm:hidden">
              {roomInfo?.data &&
                intl
                  .formatMessage({
                    id: 'roll_detail_gcyr',
                  })
                  .replace('%s', String(roomInfo?.data?.userCount))}
            </div>
          </div>

          <div className="flex sm:justify-between flex-col sm:flex-row sm:gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start flex-1 gap-2 sm:gap-5">
              {roomInfo?.data?.banner && (
                <div className="avatar relative">
                  <div className="w-[70px] sm:w-36 rounded">
                    <img src={roomInfo?.data?.banner} />
                  </div>
                  <div className="avatar-tag leading-5 h-5 sm:leading-8 sm:h-8 rounded-b text-sm sm:text-base text-base-100">
                    {roomInfo?.data.roomType === 1 ? (
                      <FormattedMessage id="roll_room_gftj" />
                    ) : (
                      <FormattedMessage id="roll_room_zbfl" />
                    )}
                  </div>
                </div>
              )}
              <div className="flex flex-col justify-between w-full h-full">
                <div className="flex flex-col gap-2">
                  <div className="text-center sm:text-left">
                    {roomInfo?.data?.title}
                  </div>
                  <div className="text-sm text-base-content text-opacity-50">
                    {roomInfo?.data?.remark}
                  </div>
                </div>
                <div className="text-sm mb-3 sm:mb-0 flex gap-2 items-center">
                  <div className="text-secondary text-right hidden sm:block">
                    {roomInfo?.data &&
                      intl
                        .formatMessage({
                          id: 'roll_detail_gcyr',
                        })
                        .replace('%s', String(roomInfo?.data?.userCount))}
                  </div>
                  {roomInfo?.data?.openTime && (
                    <div className="flex items-center">
                      {roomInfo?.data?.state === 2 ? (
                        <FormattedMessage id="roll_yjs" />
                      ) : (
                        <>
                          <FormattedMessage id="roll_detail_kjsj" />:
                          <div className="ml-2 font-mono grid grid-flow-col justify-center items-center auto-cols-max gap-4">
                            {days > 0 && (
                              <div className="flex flex-col items-center">
                                <Countdown value={days} />
                                <span className="text-xs">days</span>
                              </div>
                            )}
                            <div className="flex flex-col items-center">
                              <Countdown value={hours} />
                              <span className="text-xs">hours</span>
                            </div>

                            <div className="flex flex-col items-center">
                              <Countdown value={minutes} />
                              <span className="text-xs">min</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <Countdown value={seconds} />
                              <span className="text-xs">sec</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {roomInfo?.data && (
              <div className="flex gap-4 flex-col">
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
                      className="btn btn-secondary btn-sm rounded-xl"
                      type="button"
                    >
                      <FormattedMessage id="roll_ycy" />
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary btn-sm rounded-xl"
                      onClick={joinRoom}
                      type="button"
                    >
                      <FormattedMessage id="roll_ljcy" />
                    </button>
                  )
                ) : (
                  <button
                    className="btn btn-sm rounded-xl bg-[#434363] border-[#434363]"
                    type="button"
                  >
                    <FormattedMessage id="roll_yjs" />
                  </button>
                )}
              </div>
            )}
          </div>
        </Skeleton>
      </div>

      <div className="box-title mt-4">
        <span className="text-center text-base sm:text-2xl">
          <FormattedMessage id="roll_detail_jclb" />
        </span>
      </div>
      {!roomInfo?.loading && (
        <div className="flex justify-between sm:justify-center gap-2 my-4">
          <div>
            <FormattedMessage id="roll_detail_zjz" />
            <span className="text-primary ml-1">
              {roomInfo?.data?.poolValue}
            </span>
          </div>
          <div>
            <FormattedMessage id="roll_detail_sl" />
            <span className="text-primary ml-1">
              {roomInfo?.data?.giftCount}
            </span>
          </div>
        </div>
      )}
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
      <div className="flex flex-wrap gap-4">
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
              <div className="flex flex-col gap-2" key={item.id}>
                <div className="avatar flex-col">
                  <div className="w-[55px] sm:w-20 rounded relative">
                    <img src={item?.headPic} />
                    <img
                      src={item?.headGround}
                      className="absolute left-0 top-0 w-full h-full"
                    />
                  </div>
                </div>
                <div className="inline-flex items-center justify-center text-xs w-[55px] sm:w-20">
                  <span className="truncate">{item.nickname}</span>
                </div>
              </div>
            );
          })}
        {userList?.data?.length === 0 && (
          <div className="text-center text-base-content text-opacity-50 w-full">
            <FormattedMessage id="roll_user_empty" />
          </div>
        )}
      </div>
      {winnerList?.data && winnerList?.data?.length > 0 && (
        <>
          <div className="box-title mt-4 sm:mt-8">
            <span className="text-center text-base sm:text-2xl">
              <FormattedMessage id="roll_detail_zjyh" />
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2">
            {winnerList.data?.map((item, i) => (
              <div className="flex flex-col" key={i}>
                {item.giftVos?.[0] && (
                  <>
                    <div
                      className={`user-grade-${item.giftVos?.[0].grade} flex gap-2 p-1 items-center rounded-tl-md rounded-tr-md`}
                    >
                      <div className="avatar">
                        <div className="w-[30px] rounded relative">
                          <img src={item.giftVos?.[0]?.winnerInfo?.headPic} />
                          <img
                            src={item?.headGround}
                            className="absolute left-0 top-0 w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="truncate text-sm">
                          {item.giftVos?.[0]?.winnerInfo?.nickname}
                        </span>
                      </div>
                    </div>
                    <WeaponCard key={i} data={item.giftVos?.[0]} />
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
