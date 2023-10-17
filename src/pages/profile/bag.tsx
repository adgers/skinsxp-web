import Empty from '@/components/empty';
import { IconFont } from '@/components/icons';
import WeaponCard from '@/components/weaponCard';
import {
  exchangeQuantityUsingPOST1,
  getMyVoucherPageUsingGET,
  ornamentRetrievalUsingPOST,
} from '@/services/front/gerenzhongxinxiangguan';
import { numberFixed } from '@/utils';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {
  FormattedMessage,
  history,
  useIntl,
  useModel,
  useRequest,
} from '@umijs/max';
import { Pagination } from 'antd';
import { useState } from 'react';
import { Button, Modal } from 'react-daisyui';
import { toast } from 'react-toastify';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './index.less';

export enum ItemState {
  ALL = -1, // 全部
  ACTIVE = 0, // 已激活
  USED = 1, // 已使用
}
export enum ItemUseState {
  SOLD = 0, // 售出
  RETRIEVED = 1, // 回收
}
export default function BagPage() {
  const { getUser } = useModel('user');
  // const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useState<{
    page: number;
    stat: number;
  }>({
    page: 1,
    stat: 0,
  });
  const [orderByPrice, setOrderByPrice] = useState<boolean>(true);
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [exchangeConfirm, setExchangeConfirm] = useState<boolean>(false);
  const [steamConfrim, setSteamConfirm] = useState<boolean>(false);
  const [takeLoading, setTakeLoading] = useState<boolean>(false);
  const [saleLoading, setSaleLoading] = useState<boolean>(false);
  const intl = useIntl();

  const pageSize = 24;
  const { data, refresh, loading } = useRequest(
    () =>
      getMyVoucherPageUsingGET({
        ...searchParams,
        pageSize: pageSize,
        orderByPrice,
      }),
    {
      refreshDeps: [searchParams?.page, searchParams?.stat, orderByPrice],
    },
  );

  const { pageData = [], totalRows = 0 } = data || {};

  // const onItemClick = (item: any) => {
  //   if (checkedList.includes(item.id)) {
  //     setCheckedList(checkedList.filter((i) => i !== item.id));
  //     setTotalPrice(
  //       numberFixed(Number(totalPrice) - Number(item.recoveryPrice)),
  //     );
  //   } else {
  //     setCheckedList([...checkedList, item.id]);
  //     setTotalPrice(
  //       numberFixed(Number(totalPrice) + Number(item.recoveryPrice)),
  //     );
  //   }
  // };

  const onSelectedAll = () => {
    if (loading) {
      return;
    }
    if (allChecked) {
      setCheckedList([]);
      setTotalPrice(0);
    } else {
      setCheckedList(pageData?.map((item: any) => item.id));
      setTotalPrice(
        numberFixed(
          pageData?.reduce(
            (a: any, b: any) => Number(a) + Number(b.recoveryPrice),
            0,
          ),
        ),
      );
    }
    setAllChecked(!allChecked);
  };

  const onTakeSteam = async (itemId?: string) => {
    setTakeLoading(true);
    const ret = await ornamentRetrievalUsingPOST({
      ids: itemId ?? checkedList.join(','),
    });
    setTakeLoading(false);
    setSteamConfirm(false);
    if (ret.status === 0) {
      toast.success(intl.formatMessage({ id: 'take_steam_success' }));
      refresh();
      setCheckedList([]);
      setAllChecked(false);
      setTotalPrice(0);
    }
  };

  const onExchangeCoin = async (itemId?: string) => {
    setSaleLoading(true);
    const ret = await exchangeQuantityUsingPOST1({
      ids: itemId ?? checkedList.join(','),
    });
    setSaleLoading(false);
    setExchangeConfirm(false);
    if (ret.status === 0) {
      toast.success(intl.formatMessage({ id: 'exchange_success' }));
      refresh();
      getUser();
      setCheckedList([]);
      setTotalPrice(0);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row justify-between pb-4">
        <div className="flex gap-2 sm:gap-4 items-center text-sm">
          <div
            className="btn btn-sm btn-ghost rounded"
            onClick={() => setOrderByPrice(!orderByPrice)}
          >
            <FormattedMessage id="recoveryPrice" />{' '}
            {orderByPrice ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
          </div>
          <div className="text-white/[0.5] items-center flex ">
            <span
              className={`${
                searchParams?.stat === ItemState.ALL
                  ? 'text-white font-semibold'
                  : ''
              }`}
            >
              <FormattedMessage id="bag_all" />
            </span>
            <input
              type="checkbox"
              className="toggle toggle-primary mx-4"
              checked={searchParams.stat === 0}
              onClick={() => {
                setSearchParams({
                  ...searchParams,
                  stat:
                    searchParams.stat === ItemState.ACTIVE
                      ? ItemState.ALL
                      : ItemState.ACTIVE,
                });
              }}
            />
            <span
              className={`${
                searchParams?.stat === ItemState.ACTIVE
                  ? 'text-white font-semibold'
                  : ''
              }`}
            >
              <FormattedMessage id="bag_avaliable_sale" />
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between  sm:justify-end gap-4">
          <div
            className="text-sm text-gray cursor-pointer"
            onClick={() => history.push('/profile/record/flow#take')}
          >
            <IconFont type="icon-history" className="mr-2" />
            <FormattedMessage id="collect_history" />
          </div>
          <div
            className="btn-green !btn-sm !sm:btn-base !px-8 "
            onClick={() => {
              setCheckedList(pageData?.map((item: any) => item.id));
              setTotalPrice(
                numberFixed(
                  pageData?.reduce(
                    (a: any, b: any) => Number(a) + Number(b.recoveryPrice),
                    0,
                  ),
                ),
              );
              setExchangeConfirm(true);
            }}
          >
            <IconFont type="icon-coin" className="text-xl" />
            <FormattedMessage id="open_box_sell_all" />
          </div>
        </div>
      </div>

      <div className="mb-8 mt-4 hidden grid-cols-3 gap-12 lg:grid">
        <div className="relative flex h-full rounded-lg bg-black px-6">
          <IconFont type="icon-step1" className="text-green text-[40px] mr-4" />

          <div className="flex flex-col justify-center py-8">
            <h4 className="text-sm">
              <FormattedMessage id="collect_annouce" />
            </h4>
            <p className="mt-1 text-xs text-light">
              <FormattedMessage id="collect_annouce_detail" />
            </p>
          </div>
        </div>
        <div className="relative flex rounded-lg bg-black px-6">
          <IconFont type="icon-step2" className="text-green text-[40px] mr-4" />
          <div className="flex flex-col justify-center py-8">
            <h4 className="text-sm">
              <FormattedMessage id="collect_checksteam" />
            </h4>
            <p className="text-xs text-light">
              <FormattedMessage id="collect_checksteam_detail" />
            </p>
          </div>
        </div>
        <div className="flex rounded-lg bg-black px-6">
          <IconFont type="icon-step3" className="text-green text-[40px] mr-4" />

          <div className="flex flex-col justify-center py-8">
            <h4 className="text-sm">
              <FormattedMessage id="collect_help" />
            </h4>
            <p className="text-xs text-light">
              <FormattedMessage id="collect_help_detail" />
              <a href="/docs/help/32" target="_blank" className="underline">
                <FormattedMessage id="collect_help_link" />
              </a>
            </p>
          </div>
        </div>
      </div>

      <Swiper className="mb-10 block lg:!hidden">
        <SwiperSlide>
          <div className="swiper-slide swiper-slide-active">
            <div
              className="relative flex h-full rounded-lg bg-black px-6"
              style={{ margin: '0px 5px' }}
            >
              <IconFont
                type="icon-step1"
                className="text-green text-[40px] mr-4"
              />
              <div className="flex flex-col justify-center py-8">
                <h4 className="text-sm">
                  <FormattedMessage id="collect_annouce" />
                </h4>
                <p className="mt-1 text-xs text-light">
                  <FormattedMessage id="collect_annouce_detail" />
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-slide swiper-slide-next">
            <div
              className="relative flex h-full rounded-lg bg-black px-6"
              style={{ margin: '0px 5px' }}
            >
              <IconFont
                type="icon-step2"
                className="text-green text-[40px] mr-4"
              />

              <div className="flex flex-col justify-center py-8">
                <h4 className="text-sm">
                  <FormattedMessage id="collect_checksteam" />
                </h4>
                <p className="text-xs text-light">
                  <FormattedMessage id="collect_checksteam_detail" />
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-slide">
            <div
              className="flex h-full rounded-lg bg-black px-6"
              style={{ margin: '0px 5px' }}
            >
              <IconFont
                type="icon-step3"
                className="text-green text-[40px] mr-4"
              />
              <div className="flex flex-col justify-center py-8">
                <h4 className="text-sm">
                  <FormattedMessage id="collect_help" />
                </h4>
                <p className="text-xs text-light">
                  <FormattedMessage id="collect_help_detail" />
                  <a href="/docs/help/32" target="_blank" className="underline">
                    <FormattedMessage id="collect_help_link" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {!loading && pageData?.length === 0 && <Empty />}
      <>
        {loading && pageData?.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 gap-y-[60px] sm:gap-x-4 md:gap-y-[40px]">
            {Array.from({ length: 12 }).map((_, i) => (
              <WeaponCard loading key={i} />
            ))}
          </div>
        ) : (
          <TransitionGroup className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 gap-y-[60px] sm:gap-x-4 md:gap-y-[40px]">
            {pageData?.map((item) => {
              // const isChecked = checkedList.includes(item.id);
              const price = item?.recoveryPrice;

              const isSaleing = saleLoading && checkedList.includes(item.id);
              return (
                <CSSTransition
                  className="group relative cursor-pointer overflow-y-visible"
                  key={item.id}
                  classNames={{
                    enter: 'animate-item-enter',
                    enterActive: 'animate-item-enter-active',
                    enterDone: 'animate-item-enter-done',
                    exit: 'animate-item-exit',
                    exitActive: 'animate-item-exit-active',
                    exitDone: 'animate-item-exit-done',
                  }}
                  timeout={500}
                >
                  <div
                    className={`transition-transform duration-200 will-change-transform real-group-hover:rounded-b-none ${
                      item.state === ItemState.ACTIVE
                        ? 'group-hover:md:translate-y-[-16px]'
                        : ''
                    } group-hover:overflow-visible`}
                  >
                    <WeaponCard data={item} fromProfile={true} />
                    <div className="absolute left-0 top-0 z-10 mt-5 flex gap-10 justify-between items-center w-full  opacity-0 transition-opacity duration-200 group-hover:opacity-100 px-1 sm:p-4">
                      <div className="text-xs font-semibold uppercase leading-none css-rgj8xp text-white ">
                        {item?.sourceType}
                      </div>
                      <div className="ml-auto text-right text-xs text-white font-semibold uppercase whitespace-pre-wrap flex-1">
                        {item?.createTime}
                      </div>
                    </div>
                    <>
                      <ul className="absolute bottom-0 left-0 z-[10] w-full  divide- whitespace-nowrap  text-white/50 text-xl font-semibold leading-none transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                        {item?.verifyId && (
                          <li
                            className="border-solid bg-black"
                            onClick={(e) => {
                              e.stopPropagation();
                              history.push({
                                pathname: `/provably-fair/verify/${item?.verifyId}`,
                                search: location.search,
                              });
                            }}
                          >
                            <div className="btn btn-sm flex w-fit max-w-full m-auto items-center justify-center text-sm font-semibold uppercase transition-colors duration-150 real-hover:text-white flex-nowrap">
                              <IconFont
                                type="icon-shield"
                                className="text-green"
                              />
                              <span className="text-xs flex-1 truncate">
                                <FormattedMessage id="battle_fairness_verify" />
                              </span>
                            </div>
                          </li>
                        )}
                        {item?.state === ItemState.ACTIVE && (
                          <li
                            className="border-solid  bg-purple hover:bg-purple"
                            onClick={(e) => {
                              e.stopPropagation();
                              onExchangeCoin(item?.id);
                              // setExchangeConfirm(true);
                              setCheckedList([item?.id]);
                              // setTotalPrice(item.recoveryPrice);
                            }}
                          >
                            <div className="btn btn-sm flex  w-fit max-w-full m-auto border-none  items-center rounded-none justify-center text-sm  font-semibold uppercase transition-colors duration-150 real-hover:text-white  bg-purple hover:bg-purple">
                              <IconFont
                                type="icon-collect"
                                className={`text-white ${
                                  isSaleing ? 'animate-spin' : ''
                                }`}
                              />
                              <span className="text-xs flex-1 truncate">
                                <FormattedMessage id="bag_item_sell" />{' '}
                                <span className="text-white">
                                  <IconFont type="icon-coin" className="mr-1" />
                                  {price}
                                </span>
                              </span>
                            </div>
                          </li>
                        )}
                      </ul>
                      {item?.state === ItemState.ACTIVE && (
                        <div
                          className="absolute bottom-0 bg-green cursor-pointer flex justify-center w-full overflow-hidden rounded-none transition-transform duration-200 will-change-transform h-[32px] translate-y-[32px] sm:hidden sm:group-hover:flex"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSteamConfirm(true);
                            setTotalPrice(item.recoveryPrice as number);
                            setCheckedList([item?.id]);
                          }}
                        >
                          <div className="btn btn-sm w-fit max-w-full border-none bg-green text-dark text-sm rounded-none hover:bg-green">
                            <IconFont type="icon-steam" className="" />
                            <span className="flex-1 truncate">
                              <FormattedMessage id="exchagne" />
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  </div>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        )}
      </>

      {totalRows > pageSize && (
        <div className="flex justify-center items-center mt-12">
          <Pagination
            current={searchParams.page}
            total={totalRows}
            pageSize={pageSize}
            showSizeChanger={false}
            onChange={(page: number) => {
              setSearchParams({ ...searchParams, page: page });
            }}
            className="inner_pagination"
          />
        </div>
      )}
      <Modal open={steamConfrim} className="confirm-modal-bg max-w-sm">
        <Modal.Header className="text-base mb-2">
          <FormattedMessage id="take_steam_confrm_title" />
        </Modal.Header>
        <Modal.Body className="text-sm">
          <div className="flex flex-wrap">
            {/* <FormattedMessage id="has_select" />
            <span className="mx-1 text-primary">{checkedList.length}</span> */}

            <FormattedMessage id="total_price" />
            <span className="mx-1 text-primary font-normal">${totalPrice}</span>
          </div>
        </Modal.Body>
        <Modal.Actions>
          <Button
            className="btn-sm btn-outline rounded"
            onClick={() => {
              setSteamConfirm(false);
            }}
          >
            <FormattedMessage id="cancel" />
          </Button>
          <Button
            className="btn-primary btn-sm rounded"
            onClick={() => onTakeSteam()}
            loading={takeLoading}
          >
            <FormattedMessage id="confirm" />
          </Button>
        </Modal.Actions>
      </Modal>

      <Modal open={exchangeConfirm} className="confirm-modal-bg max-w-sm">
        <Modal.Header className="text-base mb-2">
          <FormattedMessage id="exchange_confirm_title" />
        </Modal.Header>
        <Modal.Body className="text-sm">
          <div className="flex flex-wrap">
            <FormattedMessage id="total_price" />
            <span className="mx-1 text-primary">{totalPrice}</span>
          </div>
        </Modal.Body>
        <Modal.Actions>
          <Button
            className="btn-sm btn-outline rounded"
            onClick={() => {
              setExchangeConfirm(false);
            }}
          >
            <FormattedMessage id="cancel" />
          </Button>
          <Button
            className="btn-primary btn-sm rounded"
            onClick={() => onExchangeCoin()}
          >
            <FormattedMessage id="confirm" />
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
