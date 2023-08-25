import Empty from '@/components/empty';
import WeaponCard from '@/components/weaponCard';
import {
  exchangeQuantityUsingPOST1,
  getMyVoucherPageUsingGET,
  ornamentRetrievalUsingPOST,
} from '@/services/front/gerenzhongxinxiangguan';
import { numberFixed } from '@/utils';
import { CheckCircleOutlined } from '@ant-design/icons';
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

export default function BagPage() {
  const { getUser } = useModel('user');
  const [page, setPage] = useState<number>(1);
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
    () => getMyVoucherPageUsingGET({ page, pageSize: pageSize, orderByPrice }),
    {
      refreshDeps: [page, orderByPrice],
    },
  );

  enum ItemState {
    ACTIVE = 0, // 已激活
    SOLD = 1, // 已售出
    RETRIEVED = 2, // 已回收
  }

  const { pageData = [], extData = {}, totalRows = 0 } = data || {};

  const onItemClick = (item: any) => {
    if (checkedList.includes(item.id)) {
      setCheckedList(checkedList.filter((i) => i !== item.id));
      setTotalPrice(
        numberFixed(Number(totalPrice) - Number(item.recoveryPrice)),
      );
    } else {
      setCheckedList([...checkedList, item.id]);
      setTotalPrice(
        numberFixed(Number(totalPrice) + Number(item.recoveryPrice)),
      );
    }
  };

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

  const onTakeSteam = async () => {
    setTakeLoading(true);
    const ret = await ornamentRetrievalUsingPOST({
      ids: checkedList.join(','),
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

  const onExchangeCoin = async () => {
    const ret = await exchangeQuantityUsingPOST1({
      ids: checkedList.join(','),
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
          AVALIABLE FOR SALE
          <input
            type="checkbox"
            className="toggle toggle-primary ml-4"
            checked
          />
        </div>
        <div className="btn ml-12 text-white border border-white rounded-none px-16">
          ALL SALE
        </div>
      </div>
      {!loading && pageData?.length === 0 && <Empty />}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 gap-y-[60px]  sm:gap-x-4 md:gap-y-[40px]">
        {loading
          ? Array.from({ length: pageSize }).map((_, i) => (
              <WeaponCard loading key={i} />
            ))
          : pageData?.map((item: any, i: number) => {
              const isChecked = checkedList.includes(item.id);
              const price =
                item?.recoveryPrice ||
                item?.giftPrice ||
                item?.winRecoveryPrice;

              const grade = item?.grade ?? item?.giftGrade;
              return (
                <div
                  className="group relative cursor-pointer overflow-y-visible"
                  key={i}
                  onClick={() => {
                    onItemClick(item);
                  }}
                >
                  <div className=" transition-transform duration-200 will-change-transform real-group-hover:rounded-b-none group-hover:md:translate-y-[-25px] group-hover:overflow-visible">
                    <WeaponCard data={item} fromProfile={true} />
                    {isChecked && (
                      <div className="absolute w-full h-full left-0 top-0 justify-center items-center bg-black bg-opacity-50 flex cursor-pointer">
                        <CheckCircleOutlined className="text-green text-2xl" />
                      </div>
                    )}
                    <>
                      <ul className="absolute bottom-0 left-0 z-[10] w-full  divide- whitespace-nowrap  text-white/50 text-xl font-bold leading-none transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                        <li
                          className="border-solid bg-black"
                          onClick={(e) => {
                            e.stopPropagation();

                            history.push(
                              `/profile/provably-fair/verify/${item?.verifyId}`,
                            );
                          }}
                        >
                          <div className="btn btn-sm flex w-full items-center justify-center text-sm font-semibold uppercase transition-colors duration-150 real-hover:text-white">
                            <svg className="mr-2 h-4 w-4"></svg>
                            <span>Check roll</span>
                          </div>
                        </li>
                        <li className="border-solid bg-purple">
                          <div className="btn btn-sm flex w-full items-center justify-center text-sm  font-semibold uppercase transition-colors duration-150 real-hover:text-white">
                            <svg className="mr-2 h-4 w-4"></svg>
                            <span className=" flex-1 truncate">
                              SELL for{' '}
                              <span className="text-gold">$ {price}</span>
                            </span>
                          </div>
                        </li>
                      </ul>
                      <div className="absolute bottom-0 flex w-full overflow-hidden rounded-b-lg transition-transform duration-200 will-change-transform z-[-1] h-[48px] translate-y-[48px] md:h-[50px] md:translate-y-[-1px] group-hover:md:translate-y-[50px]">
                        <div className="btn btn-sm w-full bg-green text-dark text-sm rounded-none">
                          COLLECT
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              );
            })}
      </div>

      {totalRows > pageSize && (
        <div className="flex justify-center items-center mt-12 md:mt-4">
          <Pagination
            current={page}
            total={totalRows}
            pageSize={pageSize}
            showSizeChanger={false}
            onChange={(page: number) => {
              setPage(page);
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
            <FormattedMessage id="has_select" />
            <span className="mx-1 text-primary">{checkedList.length}</span>

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
            onClick={onTakeSteam}
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
            <FormattedMessage id="has_select" />
            <span className="mx-1 text-primary">{checkedList.length}</span>
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
            onClick={onExchangeCoin}
          >
            <FormattedMessage id="confirm" />
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
