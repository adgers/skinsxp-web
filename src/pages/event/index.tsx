import { taskListUsingGET } from '@/services/front/huodongzhongxinxiangguan';
import { useModel, useRequest } from '@umijs/max';
import Banner from '../case/banner';
export default () => {
  const { data, loading, refresh } = useRequest(() => taskListUsingGET());
  const { showEmail } = useModel('user');
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
        <div className="w-full flex flex-col items-center justify-center">
          <div>FIRST DEPOSIT</div>
          <span>Enter the code “helloween” +20%</span>
          <button className="btn btn-purple">Refil</button>
        </div>
        <div className="w-full flex items-center justify-center">
          <div>Free roll</div>
          <div>
            <span>12/279</span>
            <button className="btn btn-purple">JOIN THE GIVEAWAY</button>
          </div>
        </div>
      </div>
      <div className="text-xl font-bold text-center">
        HALLOWEEN LIMITED TIMEEVENT
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
        <>
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
                    className="btn btn-green w-[256px]"
                    onClick={() => showEmail()}
                  >
                    BEGIN
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
