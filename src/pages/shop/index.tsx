import Empty from '@/components/empty';
import { IconFont } from '@/components/icons';
import WeaponCard from '@/components/weaponCard';
import {
  exchangeVoucherStockUsingPOST,
  getTagsUsingGET,
  getVoucherStockPageUsingGET,
} from '@/services/front/duihuanquanshangchengxiangguan';
import { ArrowDownOutlined, ArrowUpOutlined, LoadingOutlined } from '@ant-design/icons';
import { Menu, Transition } from '@headlessui/react';
import { FormattedMessage, useIntl, useModel, useRequest } from '@umijs/max';
import { Pagination, Spin } from 'antd';
import { Fragment, useRef, useState } from 'react';
import { toast } from 'react-toastify';

export default () => {
  const { getUser } = useModel('user');
  const [exterior, setExterior] = useState('');
  const [weaponType, setWeaponType] = useState('');
  const [keyword, setKeyword] = useState('');
  const [orderByPrice, setOrderByPrice] = useState<boolean>(true);

  const keywordRef = useRef<HTMLInputElement>(null);
  const [current, setCurrent] = useState(1);
  const pageSize = 36;
  const intl = useIntl();
  const [exChangeLoading, setExChangeLoading] = useState(false);

  const { data: selectFilters } = useRequest(() => getTagsUsingGET());

  const { data, loading } = useRequest(
    async () => {
      return await getVoucherStockPageUsingGET({
        moduleId: 5,
        pageSize: pageSize,
        page: current,
        exterior,
        weaponType,
        keyword,
        orderByPrice,
      });
    },
    {
      refreshDeps: [exterior, weaponType, current, keyword, orderByPrice],
      cacheKey: 'ticketStore',
      cacheTime: -1,
    },
  );

  const onSearch = () => {
    setKeyword(keywordRef.current?.value.trim() || '');
  };

  const onOrderChange = (value: string) => {
    setOrderByPrice(value === 'asc');
  };

  const onExteriorChange = (value: string) => {
    setExterior(value);
  };

  const onWeaponTypeChange = (value: string) => {
    setWeaponType(value);
  };

  const onExchange = async (item: any) => {
    if (exChangeLoading) {
      return false;
    }
    setExChangeLoading(true);
    const ret = await exchangeVoucherStockUsingPOST({
      stockId: item.id,
    });
    setExChangeLoading(false);
    if (ret.status === 0) {
      toast.success(intl.formatMessage({ id: 'exchange_success' }));
      getUser();
    }
  };

  return (
    <div className="w-full max-w-[1400px] m-auto relative min-h-[500px]">
      <div className="banner w-full py-[44px] md:py-[88px] mt-3 md:mt-8 bg-[url('@/assets/store-banner.png')] bg-no-repeat bg-cover flex justify-center items-center md:justify-start md:pl-[90px]">
        <div className=" max-w-[540px] flex flex-col items-center">
          <div className="text-lg md:text-xl font-semibold">
            <FormattedMessage id="wg_store_what" />
          </div>
          <div className="text-center mt-2 px-2 text-xs md:text-base">
            <FormattedMessage id="store_banner_content" />
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-between pt-4 px-3">
        <div className="grid grid-cols-3 gap-1 sm:gap-2">
          <div className="bg-dark border h-8 border-accent border-opacity-50 rounded-sm text-xs flex items-center justify-center cursor-pointer" onClick={()=> setOrderByPrice(!orderByPrice)}>
            <FormattedMessage id="recoveryPrice" />{' '}
            {orderByPrice ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
          </div>

          {selectFilters &&
            selectFilters.map((filter, i) => {
              if (filter.key && !['Type'].includes(filter.key)) {
                return null;
              }

              return (
                <Menu as="div" className="relative" key={i}>
                  <Menu.Button className="select select-sm select-accent border-opacity-50 rounded uppercase w-full font-semibold flex justify-between items-center focus:outline-none text-xs">
                    <div>{filter.name}</div>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute left-0 mt-2 bg-neutral ring-1 ring-accent rounded origin-top-left p-2 z-50 max-h-80 overflow-y-auto w-[120px]">
                      <Menu.Item key={i}>
                        {({ active }) => (
                          <div
                            className={`${
                              active ? 'bg-accent bg-opacity-10' : ''
                            } flex justify-between items-center p-2 text-sm rounded cursor-pointer`}
                            onClick={() => {
                              if (filter.key === 'Exterior') {
                                onExteriorChange('');
                              }
                              if (filter.key === 'Type') {
                                onWeaponTypeChange('');
                              }
                            }}
                          >
                            <FormattedMessage id="mall_all" />
                          </div>
                        )}
                      </Menu.Item>
                      {filter.tags &&
                        filter.tags.map((item, i) => (
                          <Menu.Item key={i}>
                            {({ active }) => (
                              <div
                                className={`${
                                  active ? 'bg-accent bg-opacity-10' : ''
                                } flex justify-between items-center p-2 text-sm rounded cursor-pointer`}
                                onClick={() => {
                                  if (filter.key === 'Exterior') {
                                    onExteriorChange(item?.key || '');
                                  }
                                  if (filter.key === 'Type') {
                                    onWeaponTypeChange(item?.key || '');
                                  }
                                }}
                              >
                                {item.name}
                              </div>
                            )}
                          </Menu.Item>
                        ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              );
            })}
        </div>
        <div className="w-full sm:w-auto flex gap-2 flex-col-reverse sm:flex-row">
          <div className="join">
            <input
              type="text"
              placeholder={intl.formatMessage({
                id: 'mall_qsrspmc',
              })}
              className="join-item input input-bordered w-full min-w-[250px] input-sm bg-dark focus:outline-none"
              ref={keywordRef}
            />

            <button
              className="join-item btn btn-primary btn-sm rounded"
              onClick={onSearch}
              type="button"
            >
              <FormattedMessage id="mall_search" />
            </button>
          </div>
        </div>
      </div>
      {!loading && data?.pageData?.length === 0 && <Empty />}

      <Spin
        spinning={loading}
        indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} />}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 gap-y-8 md:gap-4 p-3 min-h-[300px]">
          {data?.pageData?.map((item, i: number) => {
            return (
              <div
                className="group relative cursor-pointer overflow-y-visible"
                key={i}
              >
                <div
                  className={`transition-transform duration-200 will-change-transform real-group-hover:rounded-b-none group-hover:md:translate-y-[-16px] group-hover:overflow-visible`}
                  key={i}
                >
                  <WeaponCard data={item} isShopList={true} />
                  <div
                    className="absolute bottom-0 left-0 flex w-full overflow-hidden rounded-none transition-transform duration-200 will-change-transform z-[-1] h-[32px] translate-y-[32px] md:h-[32px] md:translate-y-[-1px] group-hover:md:translate-y-[32px]"
                    onClick={() => {
                      onExchange(item);
                    }}
                  >
                    <div className="btn btn-sm w-full rounded-b  md-w-[calc(100%-2px)] bg-green border-none text-dark text-sm rounded-none  hover:bg-green group-hover:w-full">
                      <IconFont
                        type="icon-collect"
                        className={exChangeLoading ? 'animate-spin' : ''}
                      />
                      <FormattedMessage id="exchagne" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {!!data?.totalRows && data?.totalRows > pageSize && (
          <div className="flex justify-center items-center mt-8 sm:mt-5">
            <Pagination
              current={current}
              total={data?.totalRows}
              pageSize={pageSize}
              showSizeChanger={false}
              onChange={(page: number) => {
                setCurrent(page);
              }}
            />
          </div>
        )}
      </Spin>
    </div>
  );
};
