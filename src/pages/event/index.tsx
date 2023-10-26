import { IconFont } from '@/components/icons';
import { listHostGiveawayUsingGET } from '@/services/front/ROLLfangxiangguan';
import {
  rewardUsingPOST,
  taskListUsingGET,
} from '@/services/front/huodongzhongxinxiangguan';
import { history, useModel, useRequest } from '@umijs/max';
import { toast } from 'react-toastify';
import Banner from '../case/banner';

enum CycleMode {
  ONE_TIME = 0,
  DAY = 1,
  WEEK = 2,
}

export default () => {
  const { data, loading, refresh } = useRequest(() => taskListUsingGET());
  const { data: giveawayList } = useRequest(() => listHostGiveawayUsingGET(), {
    cacheKey: 'giveawayList',
  });
  const freeRoll = giveawayList?.[0];
  const { showEmail } = useModel('user');

  const reward = async (taskId: string) => {
    const ret = await rewardUsingPOST({
      taskId,
    });
    if (ret?.status === 0) {
      toast.success('领取成功');
      refresh();
    }
  };
  return (
    <div className="w-full max-w-[1400px] m-auto relative min-h-[500px]">
      <Banner />
      <div
        className="flex max-w-5xl border border-purple py-[30px] mx-auto translate-y-[-50px] "
        style={{
          background:
            'var(--C3, radial-gradient(124.94% 91.38% at 49.87% 100%, #533476 0%, #1F1A33 100%))',
        }}
      >
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <div className="flex gap-2 text-lg font-bold items-center">
            <img
              src={require('@/assets/halloween-face1.png')}
              className=" w-8"
            />{' '}
            FIRST DEPOSIT
          </div>
          <span className="text-md font-normal">
            Enter the code “helloween” +20%
          </span>
          <div
            className="rounded bg-purple text-white font-bold uppercase cursor-pointer px-8 py-2"
            onClick={() => {
              history.push('/deposit');
            }}
          >
            Refill
          </div>
        </div>
        <span className="w-[1px] h-[100px] bg-light"></span>
        <div className="w-full flex items-center justify-center gap-10">
          <div className="text-gray text-sm text-center">
            Free roll
            <div className="bg-[url('@/assets/halloween-roll-bg.png')] bg-no-repeat bg-contain w-[126px] h-[94px]">
              <img
                src={freeRoll?.giftVos?.[0]?.giftImage}
                className="w-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-gray text-sm">
              <IconFont type="icon-online" className="text-purple mr-2" />
              <span className="text-white">{freeRoll?.userCount}</span>/
              {freeRoll?.giftCount}
            </div>
            <div
              className="btn btn-purple"
              onClick={() => {
                history.push(`/giveaways/${freeRoll?.id}`);
              }}
            >
              JOIN THE GIVEAWAY
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="flex gap-4 items-center  text-4xl font-bold text-center">
          <img
            src={require('@/assets/halloween-ng.png')}
            className="w-[70px] h-[70px] object-cover"
            alt=""
          />
          HALLOWEEN LIMITED TIMEEVENT
          <img
            src={require('@/assets/halloween-face2.png')}
            className="w-[70px] h-[70px] object-cover"
            alt=""
          />
        </div>
        <p className="text-gray">
          You can get tokens from event cases and by completing event quests
        </p>
      </div>
      <div className="relative mb-4 sm:mb-10 flex border-b border-light">
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
              Issue DEtails
            </div>
          </h2>
        </div>
        <div className="flex w-1/6 items-end sm:w-1/3"></div>
      </div>
      {data && data?.length > 0 && (
        <div className="flex flex-col gap-4">
          {data?.map((item, index) => {
            return (
              <div
                className="flex justify-between items-center bg-black rounded"
                key={index}
              >
                <div className="flex-1 flex items-center py-2 px-10 bg-[url('@/assets/halloween-issue-bg.png')] bg-no-repeat bg-contain">
                  <div className=" w-24 h-24 overflow-hidden">
                    <img
                      src={require('@/assets/halloween-issue-tag.png')}
                      className="w-full object-cover"
                    />
                  </div>
                  {item?.taskName}
                </div>
                <div className="flex items-center pr-16 gap-20">
                  <div className="text-green text-lg font-semibold">
                    ${item?.quantity}
                  </div>
                  <div
                    className={`btn w-[256px] ${
                      item?.reward ? 'btn-light' : 'btn-green'
                    } `}
                    onClick={() => {
                      if (!item?.complete) {
                        showEmail();
                      } else {
                        if (!item?.reward) {
                          reward(item?.id);
                        } else {
                          return;
                        }
                      }
                    }}
                  >
                    {!item?.complete
                      ? 'BEGIN'
                      : item?.reward
                      ? 'DONE'
                      : 'RECIEVE'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
