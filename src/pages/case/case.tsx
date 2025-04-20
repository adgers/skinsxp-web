import { IconFont } from '@/components/icons';
import { getHostListUsingGET } from '@/services/front/duizhanxiangguan';
import { isLogin, numberSplitCeil } from '@/utils';
import { FormattedMessage, history, useIntl, useRequest } from '@umijs/max';
import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { toast } from 'react-toastify';
import BattleItem from './battleItem';
import './index.less';

interface CaseProps {
  boxList: API.BoxThemeListVo[];
}

export default function Case(props: CaseProps) {

  const { boxList } = props;

  const [hotBoxList, setHotBoxList] = useState<API.BoxThemeListVo[]>([]);
  const [otherBoxList, setOtherBoxList] = useState<API.BoxThemeListVo[]>([]);
  const intl = useIntl();

  const search = location.search;

  // const { data: boxList = [] } = useRequest(
  //   () =>
  //     getBoxListUsingGET({
  //       boxType: 1,
  //       moduleId: 5,
  //     }),
  //   {
  //     cacheKey: 'boxList',
  //   },
  // );
  const { data: battleList } = useRequest(() => getHostListUsingGET(), {
    cacheKey: 'battleList',
  });

  useEffect(() => {
    if ( !boxList || boxList.length === 0) return;

    if (boxList.length > 1) {
      // setHotBoxList(boxList.slice(0, 1));
      setOtherBoxList(boxList.slice(1));
    } else {
      // setHotBoxList(boxList);
    }
  }, [boxList]);


  const renderBox = (t: API.BoxThemeListVo, index: number) => {
    return (
      <div className="px-4" key={index}>
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
                {t.themeName}
              </div>
            </h2>
          </div>
          <div className="flex w-1/6 items-end sm:w-1/3"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {t.boxList?.map((v, idx) => (
            <div
              key={idx}
              className="w-full h-full relative cursor-pointer case-wrap aspect-[1/1.4] rounded-md overflow-hidden transition-all duration-200 will-change-transform hover:-translate-y-0.5"
              onClick={() => {
                history.push({
                  pathname: `/case/${v?.id}`,
                  search: search,
                });
              }}
            >
              <LazyLoad offset={200}>
                <img
                  src={v?.boxImage}
                  alt={v.boxName}
                  className="w-full h-full object-contain rounded-md"
                />
                <div className="w-full h-full absolute top-0 left-0">
                  {Number(v?.discount) < 100 && (
                    <div className="absolute top-[25px] left-[25px]  text-green px-1.5 rounded bg-[#123F0D]">
                      -{100 - Number(v?.discount)}%
                    </div>
                  )}
                  {/* <div className="absolute top-[1.5] left-[1.75] text-green">New !</div> */}
                  <div className="absolute top-[20px] flex flex-col items-center right-0 bg-black/[0.8] rounded-l text-white px-2 py-0.5 font-num sm:text-xl">
                    {Number(v?.discount) < 100 && (
                      <span className="text-gray text-sm font-normal line-through">
                        R$
                        {numberSplitCeil(
                          (Number(v?.openPrice) * 100) / Number(v?.discount),
                        )}
                      </span>
                    )}
                    R${v?.openPrice}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-sm py-3 px-2">
                    <div className="w-full text-white truncate text-center">
                      {v?.boxName}
                    </div>
                  </div>
                </div>
              </LazyLoad>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <>
      {hotBoxList.map((t, i) => renderBox(t, i))}
      {battleList && battleList.length > 0 && (
        <div className="px-4">
          <div className="relative mb-4 sm:mb-10 flex border-b border-light">
            <div className="flex w-1/6 items-end sm:w-1/3"></div>
            <div className="flex w-4/6 items-center sm:w-1/3">
              <h2
                className="row-start-1 row-end-1 -mb-px ml-auto mr-auto mt-10 border-b border-green px-6 pb-5 text-center text-base font-semibold uppercase text-white sm:text-lg lg:col-start-2 lg:col-end-2 lg:max-w-xs "
                style={{
                  background:
                    'var(--j-1, linear-gradient(0deg, rgba(54, 122, 46, 0.68) 0%, rgba(0, 0, 0, 0.00) 98.14%))',
                }}
              >
                <div className="flex h-7 gap-1 items-center sm:h-8 text-sm sm:text-base">
                  <IconFont type="icon-battle" />
                  <FormattedMessage id="room_top_battle" />
                </div>
              </h2>
            </div>
            <div className="flex w-1/6 items-end sm:w-1/3"></div>
          </div>

          <div className="relative flex h-full">
            <div className="flex w-full snap-x snap-mandatory overflow-x-auto xl:grid xl:snap-none xl:grid-cols-4 opacity-100 gap-2 hide-scrollbar">
              {battleList?.map((item, index) => {
                return <BattleItem data={item} key={index} index={index} />;
              })}
            </div>
            <div className="p-8 bg-[#040305]/50 w-8 md:w-64 flex flex-col items-center justify-center md:justify-between">
              <div
                className="hidden btn btn-purple w-full items-center md:flex bettle-btn uppercase"
                onClick={() => {
                  if (isLogin()) {
                    history.push({
                      pathname: `/battle/create`,
                      search: search,
                    });
                  } else {
                    toast.error(intl?.formatMessage({ id: 'not_login_title' }));
                  }
                }}
              >
                {/* CREATE BATTLE */}
                <FormattedMessage id="room_create_battle" />
              </div>
              <span className="hidden md:block">
                <FormattedMessage id="text_normal_or" />
              </span>
              <div
                className="hidden btn btn-green w-full md:flex bettle-btn"
                onClick={() => {
                  history.push({
                    pathname: `/battle`,
                    search: search,
                  });
                }}
              >
                <FormattedMessage id="room_join_battle" />
              </div>
              <div className="inline-block -rotate-90 transform text-white text-center md:hidden whitespace-nowrap">
                <FormattedMessage id="room_top_battle" />
              </div>
            </div>
          </div>
        </div>
      )}

      {otherBoxList.map((t, i) => renderBox(t, i))}
    </>
  );
}
