import '@/pages/case/index.less';
import { listHostGiveawayUsingGET } from '@/services/front/ROLLfangxiangguan';
import {
  completeUsingPOST,
  rewardUsingPOST,
  taskListUsingGET,
} from '@/services/front/huodongzhongxinxiangguan';
import { getPromotionInfoUsingGET } from '@/services/front/tuiguangzhongxinxiangguan';
import { DownOutlined, RightOutlined, UpOutlined } from '@ant-design/icons';
import {
  FormattedMessage,
  history,
  useIntl,
  useModel,
  useRequest,
} from '@umijs/max';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import GiveawayItem from '../case/giveawayItem';
import './index.less';

enum CycleMode {
  ONE_TIME = 0,
  DAY = 1,
  WEEK = 2,
}

enum TaskEvent {
  BOX = 0,
  BATTLE,
  RECHARGE,
  UPGRADE = 4,
  EMAIL,
  MALL,
  FOLLOW,
}

export default () => {
  const intl = useIntl();
  const [show, setShow] = useState(false);
  const { data: giveawayList } = useRequest(() => listHostGiveawayUsingGET(), {
    cacheKey: 'giveawayList',
  });
  const { data, loading, refresh } = useRequest(() => taskListUsingGET());
  const { data: promotionData = {} } = useRequest(() =>
    getPromotionInfoUsingGET(),
  );

  const { showEmail, userInfo, getUser } = useModel('user');

  const reward = async (taskId: string) => {
    const ret = await rewardUsingPOST({
      taskId,
    });
    if (ret?.status === 0) {
      toast.success(intl.formatMessage({ id: 'recieve_success' }));
      refresh();
      getUser();
    }
  };

  const completeTask = async (taskId: string) => {
    const ret = await completeUsingPOST({
      taskId,
    });
    if (ret?.status === 0) {
      toast.success(intl.formatMessage({ id: 'recieve_success' }));
      refresh();
    }
  };

  useEffect(() => {
    if (userInfo?.mail) {
      refresh();
    }
  }, [userInfo?.mail]);

  const renderProgress = (item: API.MyTaskVo) => {
    switch (item.taskAchieveType) {
      case TaskEvent.BOX:
        return (
          <div>
            {item.currentBoxTimes} / {item.boxTimes}
          </div>
        );
      case TaskEvent.RECHARGE:
        return (
          <div className="text-gray">
            <span className="text-green">${item.currentRechargeAmount}</span> /
            ${item.rechargeAmount}
          </div>
        );
      case TaskEvent.BATTLE:
        return (
          <div>
            {item.currentBattleTimes} / {item.battleTimes}
          </div>
        );
      case TaskEvent.UPGRADE:
        return (
          <div>
            {item.currentUpgradeTimes} / {item.upgradeTimes}
          </div>
        );
      case TaskEvent.EMAIL:
      case TaskEvent.FOLLOW:
        return null;
    }
  };
  return (
    <div className="w-full max-w-[1400px] m-auto relative min-h-[500px]">
      <div className="mx-auto max-w-[80%]  md:max-w-5xl translate-y-[-50px] flex snap-x snap-mandatory overflow-x-auto hide-scrollbar xl:grid xl:snap-none xl:grid-cols-4 opacity-100 gap-4">
        {giveawayList?.map((item, index) => {
          return <GiveawayItem index={index} item={item} key={index} />;
        })}
      </div>
      <div className="mx-auto max-w-[80%]  md:max-w-5xl">
        <div
          className="w-full flex items-center md:items-start gap-2 md:gap-0 border border-red"
          style={{
            background:
              'var(--E2, linear-gradient(90deg, rgba(150, 21, 44, 0.54) 0%, rgba(125, 25, 31, 0.00) 50%), rgba(22, 22, 22, 0.75))',
          }}
        >
          <div className=" w-full flex flex-col items-center justify-center gap-2  py-2 md:py-[30px] bg-[url('@/assets/blackfriday-bg.png')] bg-no-repeat bg-contain">
            <div className="flex gap-2 text-sm md:text-lg font-bold items-center">
              <img
                src={require('@/assets/blackfriday-tag.png')}
                className=" w-5 md:w-8"
              />{' '}
              <FormattedMessage id="black_event_partner" />
            </div>
            <div
              className="rounded bg-red text-white font-bold uppercase cursor-pointer px-8 py-2"
              onClick={() => {
                history.push('/profile/partner');
              }}
            >
              <FormattedMessage id="black_event_invite" /> <RightOutlined />
            </div>
          </div>
          <span className="w-[1px] h-[80px] bg-light mt-2 md:mt-[30px]"></span>
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-0 md:gap-10  py-2 md:py-[30px] ">
            <div className="flex flex-col text-gray text-sm text-center gap-2">
              <div>
                <FormattedMessage id="promoteCode_user_num" />
              </div>
              <div className="text-white text-lg">
                {promotionData?.accumulatedRegisterCount}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-gray text-sm">
                <FormattedMessage id="promoteCode_rebate_num" />
              </div>
              <div className="text-yellow text-lg">
                ${promotionData?.accumulatedRebateAmount}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full  md:max-w-5xl items-center mx-auto justify-center mt-4">
          <div
            className="text-center text-gray cursor-pointer"
            onClick={() => {
              setShow(!show);
            }}
          >
            <FormattedMessage id="black_event_zmz" />{' '}
            {show ? <UpOutlined /> : <DownOutlined />}
          </div>
          <div
            className={`w-full overflow-y-clip mt-2  ${show ? 'show' : 'hide'}`}
          >
            <div className="hidden grid-cols-3 gap-12 lg:grid">
              <div
                className="relative flex items-center h-full rounded-lg  px-6 py-2 text-sm"
                style={{
                  background:
                    'linear-gradient(90deg, #453A3A 0%, rgba(56, 45, 46, 0.00) 100%)',
                }}
              >
                <FormattedMessage id="black_event_work1" />
              </div>
              <div
                className="relative flex items-center h-full rounded-lg  px-6 py-2 text-sm"
                style={{
                  background:
                    'linear-gradient(90deg, #453A3A 0%, rgba(56, 45, 46, 0.00) 100%)',
                }}
              >
                <FormattedMessage id="black_event_work2" />
              </div>
              <div
                className="relative flex items-center h-full rounded-lg  px-6 py-2 text-sm"
                style={{
                  background:
                    'linear-gradient(90deg, #453A3A 0%, rgba(56, 45, 46, 0.00) 100%)',
                }}
              >
                <FormattedMessage id="black_event_work3" />
              </div>
            </div>

            <Swiper className="block lg:!hidden">
              <SwiperSlide>
                <div className="swiper-slide swiper-slide-active">
                  <div
                    className="relative flex items-center h-full rounded-lg  px-6 py-2 text-sm"
                    style={{
                      background:
                        'linear-gradient(90deg, #453A3A 0%, rgba(56, 45, 46, 0.00) 100%)',
                    }}
                  >
                    <FormattedMessage id="black_event_work1" />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="swiper-slide swiper-slide-next">
                  <div
                    className="relative flex items-center h-full rounded-lg  px-6 py-2 text-sm"
                    style={{
                      background:
                        'linear-gradient(90deg, #453A3A 0%, rgba(56, 45, 46, 0.00) 100%)',
                    }}
                  >
                    <FormattedMessage id="black_event_work2" />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="swiper-slide">
                  <div
                    className="relative flex items-center h-full rounded-lg  px-6 py-2 text-sm"
                    style={{
                      background:
                        'linear-gradient(90deg, #453A3A 0%, rgba(56, 45, 46, 0.00) 100%)',
                    }}
                  >
                    <FormattedMessage id="black_event_work3" />
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center px-2">
        <div className="flex gap-4 items-center text-xl md:text-4xl font-bold text-center">
          <img
            src={require('@/assets/blackfriday-gift.png')}
            className="w-[35px] md:w-[70px] h-[35px] md:h-[70px] object-cover"
            alt=""
          />
          <FormattedMessage id="black_event_title" />

          <img
            src={require('@/assets/blackfriday-star.png')}
            className="w-[35px] md:w-[70px] h-[35px] md:h-[70px] object-cover"
            alt=""
          />
        </div>
        <p className="text-gray text-center">
          <FormattedMessage id="black_event_desc" />
        </p>
      </div>
      <div className="relative mx-4 md:mx-0 mb-4 sm:mb-10 flex border-b border-light">
        <div className="flex w-1/6 items-end sm:w-1/3"></div>
        <div className="flex w-4/6 items-center sm:w-1/3">
          <h2
            className="row-start-1 row-end-1 -mb-px ml-auto mr-auto mt-10 border-b-[3px] border-green px-7 pb-[20px] pt-[5px] text-center text-base font-semibold uppercase text-white sm:text-lg lg:col-start-2 lg:col-end-2"
            style={{
              background:
                ' var(--j-1, linear-gradient(0deg, rgba(54, 122, 46, 0.68) 0%, rgba(0, 0, 0, 0.00) 98.14%))',
            }}
          >
            <div className="flex items-center text-sm sm:text-base sm:leading-[28px]">
              <FormattedMessage id="event_label" />
            </div>
          </h2>
        </div>
        <div className="flex w-1/6 items-end sm:w-1/3"></div>
      </div>
      {data && data?.length > 0 && (
        <div className="flex flex-col gap-4 mx-4 md:mx-0">
          {data?.map((item, index) => {
            return (
              <div
                className="flex flex-col md:flex-row px-10 pb-4 justify-between items-center bg-black rounded border md:border-none border-light"
                key={index}
              >
                <div className="md:flex-1 flex flex-col md:flex-row items-center py-2 md:px-10 w-full md:w-fit bg-[url('@/assets/halloween-issue-bg.png')] bg-no-repeat bg-contain bg-center md:bg-left">
                  <div className="w-12 md:w-24 h-12 md:h-24 overflow-hidden flex items-center">
                    <img
                      src={require('@/assets/blackfriday-eventBg.png')}
                      className="w-full object-cover"
                    />
                  </div>
                  <div className=" flex flex-col md:flex-row items-center gap-2">
                    {item?.taskName}
                    {renderProgress(item)}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center md:pr-16 md:gap-20">
                  <div className="text-green text-lg font-semibold">
                    ${item?.quantity}
                  </div>
                  {item?.reward ? (
                    <div className="w-[256px] h-[48px] bg-light rounded flex items-center justify-center  cursor-not-allowed ">
                      <FormattedMessage id="event_recieved" />
                    </div>
                  ) : (
                    <div
                      className={`btn w-[256px] ${
                        item?.reward ? 'btn-light' : 'btn-green'
                      } `}
                      onClick={() => {
                        if (!item?.complete) {
                          switch (item.taskAchieveType) {
                            case TaskEvent.BOX:
                              history.push('/case');
                              break;
                            case TaskEvent.BATTLE:
                              history.push('/battle');
                              break;
                            case TaskEvent.RECHARGE:
                              history.push('/deposit');
                              break;
                            case TaskEvent.UPGRADE:
                              history.push('/upgrade');
                              break;
                            case TaskEvent.EMAIL:
                              showEmail();
                              break;
                            case TaskEvent.MALL:
                              history.push('/market');
                              break;
                            case TaskEvent.FOLLOW:
                              window.open('https://discord.gg/ucDMTAbAcS');
                              completeTask(item?.id);
                              break;
                          }
                        } else {
                          if (!item?.reward) {
                            reward(item?.id);
                          } else {
                            return;
                          }
                        }
                      }}
                    >
                      {!item?.complete ? (
                        <FormattedMessage id="event_begin" />
                      ) : (
                        <FormattedMessage id="event_recieve" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
