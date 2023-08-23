import Empty from '@/components/empty';
import WeaponCard from '@/components/weaponCard';
import { EXTERIOR, WEAPON_TYPE } from '@/constants';
import { getVoucherStockPageUsingGET } from '@/services/front/duihuanquanshangchengxiangguan';
import { Menu, Transition } from '@headlessui/react';
import { FormattedMessage, useIntl, useModel, useRequest } from '@umijs/max';
import { Pagination } from 'antd';
import { Fragment, useRef, useState } from 'react';
import Exchange from './exchange';

export default () => {
  const { getUser } = useModel('user');
  const [exterior, setExterior] = useState('');
  const [weaponType, setWeaponType] = useState('');
  const [keyword, setKeyword] = useState('');
  const [orderByPrice, setOrderByPrice] = useState<boolean>(true);

  const keywordRef = useRef<HTMLInputElement>(null);
  const [current, setCurrent] = useState(1);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState<any>({});
  const pageSize = 36;
  const intl = useIntl();

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

  const showExchangeModal = (item: any) => {
    setItem(item);
    setShow(true);
  };

  const hideExchangeModal = () => {
    setShow(false);
  };

  const onExchangeSuccess = () => {
    getUser();
    setShow(false);
  };

  return (
    <div className="w-full max-w-[1400px] m-auto relative min-h-[500px]">
      <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-between pt-4 px-3">
        <div className="flex gap-2 sm:gap-4 flex-1">
          <Menu as="div" className="relative w-40">
            <Menu.Button className="whitespace-nowrap select select-sm select-accent border-opacity-50 rounded uppercase w-full font-semibold flex justify-between items-center focus:outline-none">
              <FormattedMessage id="mall_sort_mrpx" />
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
              <Menu.Items className="absolute left-0 mt-2 w-full bg-neutral ring-1 ring-accent rounded-sm origin-top-left p-2 z-50">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`${
                        active ? 'bg-accent bg-opacity-10' : ''
                      } flex justify-between items-center p-2 text-sm rounded cursor-pointer`}
                      onClick={() => onOrderChange('asc')}
                    >
                      <FormattedMessage id="mall_sort_ascending" />
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`${
                        active ? 'bg-accent bg-opacity-10' : ''
                      } flex justify-between items-center p-2 text-sm rounded cursor-pointer`}
                      onClick={() => onOrderChange('desc')}
                    >
                      <FormattedMessage id="mall_sort_descending" />
                    </div>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>

          <Menu as="div" className="relative w-40">
            <Menu.Button className="select select-sm select-accent border-opacity-50 rounded uppercase w-full font-semibold flex justify-between items-center focus:outline-none">
              <div>外观</div>
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
              <Menu.Items className="absolute left-0 mt-2 w-full bg-neutral ring-1 ring-accent rounded origin-top-left p-2 z-50">
                {EXTERIOR.map((item, i) => (
                  <Menu.Item key={i}>
                    {({ active }) => (
                      <div
                        className={`${
                          active || item.key === exterior
                            ? 'bg-accent bg-opacity-10'
                            : ''
                        } flex justify-between items-center p-2 text-sm rounded cursor-pointer`}
                        onClick={() => onExteriorChange(item.key)}
                      >
                        {item.name}
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>

          <Menu as="div" className="relative w-40">
            <Menu.Button className="select select-sm select-accent border-opacity-50 rounded uppercase w-full font-semibold flex justify-between items-center focus:outline-none">
              <div>武器类型</div>
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
              <Menu.Items className="absolute left-0 mt-2 w-full bg-neutral ring-1 ring-accent rounded origin-top-left p-2 z-50 max-h-80 overflow-y-auto">
                {WEAPON_TYPE.map((item, i) => (
                  <Menu.Item key={i}>
                    {({ active }) => (
                      <div
                        className={`${
                          active || item.key === weaponType
                            ? 'bg-accent bg-opacity-10'
                            : ''
                        } flex justify-between items-center p-2 text-sm rounded cursor-pointer`}
                        onClick={() => onWeaponTypeChange(item.key)}
                      >
                        {item.name}
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div className="w-full sm:w-auto flex gap-2 flex-col-reverse sm:flex-row">
          {/* <div className="join">
            <input
              type="text"
              placeholder="最低价"
              className="join-item input w-20 input-bordered input-sm bg-neutral"
            />
            <div className="join-item flex items-center">
              <div className=" bg-white w-[10px] h-[1px] mx-2"></div>
            </div>
            <input
              type="text"
              placeholder="最高价"
              className="join-item input w-20 input-bordered input-sm bg-neutral"
            />
            <button className="join-item btn btn-primary btn-sm rounded">
              搜索
            </button>
          </div> */}
          <div className="join">
            <input
              type="text"
              placeholder={intl.formatMessage({
                id: 'mall_qsrspmc',
              })}
              className="join-item input input-bordered w-full min-w-[250px] input-sm bg-neutral focus:outline-none"
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
      {/* {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-50">
          <LotterLoading />
        </div>
      )} */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 p-2 sm:p-6 min-h-[200px]">
        {data?.pageData?.map((item, i: number) => {
          return (
            <div className="group relative" key={i}>
              <WeaponCard data={item} />
              <div className="absolute w-full h-full left-0 top-0 justify-center items-center bg-base-100 bg-opacity-50 hidden group-hover:flex rounded-md">
                <div
                  className="btn btn-xs btn-primary rounded btn-outline"
                  onClick={() => {
                    showExchangeModal(item);
                  }}
                >
                  <FormattedMessage id="exchagne" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Exchange
        show={show}
        item={item}
        onClose={hideExchangeModal}
        onSuccess={onExchangeSuccess}
      />
      {!!data?.totalRows && data?.totalRows > pageSize && (
        <div className="flex justify-center items-center">
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
    </div>
  );
};
