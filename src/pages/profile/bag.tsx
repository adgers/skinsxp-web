import Empty from '@/components/empty';
import { IconFont } from '@/components/icons';
import WeaponCard from '@/components/weaponCard';
import {
  exchangeQuantityUsingPOST1,
  getMyVoucherPageUsingGET,
  ornamentRetrievalUsingPOST,
} from '@/services/front/gerenzhongxinxiangguan';
import { numberFixed } from '@/utils';
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
export enum ItemState {
  ALL = -1, // 全部
  ACTIVE = 0, // 已激活
  SOLD = 1, // 已售出
  RETRIEVED = 2, // 已回收
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
    const ret = await exchangeQuantityUsingPOST1({
      ids: itemId ?? checkedList.join(','),
    });
    setExchangeConfirm(false);
    if (ret.status === 0) {
      toast.success(intl.formatMessage({ id: 'exchange_success' }));
      refresh();
      getUser();
      setCheckedList([]);
      setAllChecked(false);
      setTotalPrice(0);
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 sm:gap-4 px-3 pb-4 items-center justify-end text-sm">
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
          <IconFont type="icon-a-allsale" className="text-xl" />
          <FormattedMessage id="open_box_sell_all" />
        </div>
      </div>
      {!loading && pageData?.length === 0 && <Empty />}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 gap-y-[60px] sm:gap-x-4 md:gap-y-[40px]">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <WeaponCard loading key={i} />
            ))
          : pageData?.map((item: any, i: number) => {
              // const isChecked = checkedList.includes(item.id);
              const price =
                item?.recoveryPrice ||
                item?.giftPrice ||
                item?.winRecoveryPrice;

              const grade = item?.grade ?? item?.giftGrade;
              return (
                <div
                  className="group relative cursor-pointer overflow-y-visible"
                  key={i}
                  // onClick={() => {
                  //   onItemClick(item);
                  // }}
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
                      <div className="text-xs font-bold uppercase leading-none css-rgj8xp text-white ">
                        {item?.sourceType}
                      </div>
                      <div className="ml-auto text-right text-xs text-white font-bold uppercase whitespace-pre-wrap flex-1">
                        {item?.createTime}
                      </div>
                    </div>
                    <>
                      <ul className="absolute bottom-0 left-0 z-[10] w-full  divide- whitespace-nowrap  text-white/50 text-xl font-bold leading-none transition-opacity duration-200 opacity-0 group-hover:opacity-100">
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
                              // onExchangeCoin(item?.id);
                              setExchangeConfirm(true);
                              setCheckedList([item?.id]);
                              setTotalPrice(item.recoveryPrice);
                            }}
                          >
                            <div className="btn btn-sm flex  w-fit max-w-full m-auto border-none  items-center rounded-none justify-center text-sm  font-semibold uppercase transition-colors duration-150 real-hover:text-white  bg-purple hover:bg-purple">
                              <IconFont
                                type="icon-collect"
                                className="text-white"
                              />
                              <span className="text-xs flex-1 truncate">
                                <FormattedMessage id="bag_item_sell" />{' '}
                                <span className="text-white">${price}</span>
                              </span>
                            </div>
                          </li>
                        )}
                      </ul>
                      {item?.state === ItemState.ACTIVE && (
                        <div
                          className="absolute bottom-0 bg-green flex justify-center w-full overflow-hidden rounded-none transition-transform duration-200 will-change-transform z-[-1] h-[32px] translate-y-[32px] md:h-[32px] md:translate-y-[-1px] group-hover:md:translate-y-[32px]"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSteamConfirm(true);
                            setTotalPrice(item.recoveryPrice);
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
                </div>
              );
            })}
      </div>

      {totalRows > pageSize && (
        <div className="flex justify-center items-center mt-12 md:mt-4">
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
            <span className="mx-1 text-primary">{totalPrice}</span>
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
