import { IconFont } from '@/components/icons';
import { listHostGiveawayUsingGET } from '@/services/front/ROLLfangxiangguan';
import {
  rewardUsingPOST,
  taskListUsingGET,
} from '@/services/front/huodongzhongxinxiangguan';
import {
  FormattedMessage,
  history,
  useIntl,
  useModel,
  useRequest,
} from '@umijs/max';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

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
}

export default () => {
  const intl = useIntl();
  const { data, loading, refresh } = useRequest(() => taskListUsingGET());
  const { data: giveawayList } = useRequest(() => listHostGiveawayUsingGET(), {
    cacheKey: 'giveawayList',
  });
  const freeRoll = giveawayList?.[0];
  const { showEmail, userInfo } = useModel('user');

  const reward = async (taskId: string) => {
    const ret = await rewardUsingPOST({
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
  return (
    <div className="w-full max-w-[1400px] m-auto relative min-h-[500px]">
      <div
        className="max-w-[80%] flex  md:max-w-5xl items-center md:items-start gap-2 md:gap-0 border border-purple py-2 md:py-[30px] mx-auto translate-y-[-50px] "
        style={{
          background:
            'var(--C3, radial-gradient(124.94% 91.38% at 49.87% 100%, #533476 0%, #1F1A33 100%))',
        }}
      >
        <div className=" w-full flex flex-col items-center justify-center gap-2">
          <div className="flex gap-2 text-sm md:text-lg font-bold items-center">
            <img
              src={require('@/assets/halloween-face1.png')}
              className=" w-5 md:w-8"
            />{' '}
            <FormattedMessage id="halloween_sc" />
          </div>
          <div className="text-xs md:text-md font-normal text-center">
            <FormattedMessage id="halloween_srdm" />
          </div>
          <div
            className="rounded bg-purple text-white font-bold uppercase cursor-pointer px-8 py-2"
            onClick={() => {
              history.push('/deposit');
            }}
          >
            <FormattedMessage id="wc_rewards_deposit" />
          </div>
        </div>
        <span className="w-[1px] h-[100px] bg-light"></span>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-0 md:gap-10">
          <div className="text-gray text-xs md:text-sm text-center">
            <FormattedMessage id="halloween_mfrf" />

            <div className="bg-[url('@/assets/halloween-roll-bg.png')] bg-no-repeat bg-contain w-[100px] md:w-[126px] h-[60px] md:h-[94px]">
              <img
                src={freeRoll?.giftVos?.[0]?.giftImage}
                className="w-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-gray text-sm">
              <IconFont type="icon-online" className="text-purple mr-2" />
              <span className="text-white">{freeRoll?.userCount}</span>
            </div>
            <div
              className="btn btn-purple !min-h-0 !h-[40px] md:!h-12"
              onClick={() => {
                history.push(`/giveaways/${freeRoll?.id}`);
              }}
            >
              <FormattedMessage id="halloween_jrrf" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center px-2">
        <div className="flex gap-4 items-center text-xl md:text-4xl font-bold text-center">
          <img
            src={require('@/assets/halloween-ng.png')}
            className="w-[35px] md:w-[70px] h-[35px] md:h-[70px] object-cover"
            alt=""
          />
          <FormattedMessage id="halloween_title" />

          <img
            src={require('@/assets/halloween-face2.png')}
            className="w-[35px] md:w-[70px] h-[35px] md:h-[70px] object-cover"
            alt=""
          />
        </div>
        <p className="text-gray text-center">
          <FormattedMessage id="halloween_desc" />
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
                      src={require('@/assets/halloween-issue-tag.png')}
                      className="w-full object-cover"
                    />
                  </div>
                  {item?.taskName}
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
