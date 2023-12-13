import '@/pages/case/index.less';
import {
  completeUsingPOST,
  rewardUsingPOST,
  taskListUsingGET,
} from '@/services/front/huodongzhongxinxiangguan';
import { getPromotionInfoUsingGET } from '@/services/front/tuiguangzhongxinxiangguan';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl, useModel, useRequest } from '@umijs/max';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
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
      <div className="mx-auto max-w-[80%]  md:max-w-5xl"></div>

      <div className="w-full flex flex-col items-center px-2 mb-5">
        <div className="flex gap-4 items-center text-xl md:text-4xl font-bold text-center">
          <img
            src={require('@/assets/xmas-left.png')}
            className="w-[35px] md:w-[74px] h-[35px] md:h-[96px] object-cover"
            alt=""
          />
          <FormattedMessage id="event_title" />

          <img
            src={require('@/assets/xmas-right.png')}
            className="w-[35px] md:w-[74px] h-[35px] md:h-[96px] object-cover"
            alt=""
          />
        </div>
        <p className="text-gray text-center">
          <FormattedMessage id="event_desc" />
        </p>
      </div>

      {data && data?.length > 0 && (
        <div className="flex flex-col gap-4 mx-4 md:mx-0">
          {data?.map((item, index) => {
            return (
              <div
                className="flex flex-col md:flex-row pb-4 justify-between items-center bg-black rounded border md:border-none border-light"
                key={index}
              >
                <div className="md:flex-1 flex flex-col md:flex-row items-center py-2 md:px-10 w-full md:w-fit bg-[url('@/assets/halloween-issue-bg.png')] bg-no-repeat bg-contain bg-center md:bg-left">
                  <div className="w-12 md:w-[158px] h-12 md:h-[118px] overflow-hidden flex items-center">
                    <img
                      src={require('@/assets/xmas-xiaolu.png')}
                      className="w-full object-cover"
                    />
                  </div>
                  <div className=" flex flex-col md:flex-row items-center gap-2">
                    {/* {item?.taskName}
                    {renderProgress(item)} */}
                    123
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center md:pr-16 md:gap-20">
                  <div className="text-green text-lg font-semibold">
                    {/* {item?.quantity ? `$${item?.quantity}` : null} */}
                  </div>
                  {/* {item?.reward ? (
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
                  )} */}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="w-full flex justify-center">
        <div
          className="btn my-5"
          style={{
            background:
              'var(--M1, linear-gradient(270deg, #0BFF59 0.04%, #B4FC3B 99.77%))',
          }}
          onClick={() => {
            window.open('https://discord.gg/ucDMTAbAcS');
          }}
        >
          <FormattedMessage id="event_xmas_lxwm" />
        </div>
      </div>
      <div className="w-full  md:max-w-5xl items-center mx-auto justify-center mt-4">
        <div
          className="text-center text-gray cursor-pointer"
          onClick={() => {
            setShow(!show);
          }}
        >
          <FormattedMessage id="event_xmas_tip" /> {show ? <UpOutlined /> : <DownOutlined />}
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
              <FormattedMessage id="event_xmas_tip1" />
            </div>
            <div
              className="relative flex items-center h-full rounded-lg  px-6 py-2 text-sm"
              style={{
                background:
                  'linear-gradient(90deg, #453A3A 0%, rgba(56, 45, 46, 0.00) 100%)',
              }}
            >
              <FormattedMessage id="event_xmas_tip2" />
            </div>
            <div
              className="relative flex items-center h-full rounded-lg  px-6 py-2 text-sm"
              style={{
                background:
                  'linear-gradient(90deg, #453A3A 0%, rgba(56, 45, 46, 0.00) 100%)',
              }}
            >
              <FormattedMessage id="event_xmas_tip3" />
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
                  <FormattedMessage id="event_xmas_tip1" />
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
                  <FormattedMessage id="event_xmas_tip2" />
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
                  <FormattedMessage id="event_xmas_tip3" />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      {/* <div className="relative mx-4 md:mx-0 mb-4 sm:mb-10 flex border-b border-light">
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
      </div> */}
    </div>
  );
};
