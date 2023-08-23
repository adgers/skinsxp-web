import { IconFont } from '@/components/icons';
import { createBattleUsingPOST } from '@/services/front/duizhanxiangguan';
import { numberFixed } from '@/utils';
import { FormattedMessage, history, useIntl, useModel } from '@umijs/max';
import { useState } from 'react';
import CountUp from 'react-countup';
import { Button, Modal } from 'react-daisyui';

export default function CreateRoom({
  battleBoxs,
  show,
  onClose,
}: {
  battleBoxs?: API.BoxPageVo[];
  show: boolean;
  onClose: () => void;
}) {
  const { userInfo, getUser } = useModel('user');
  const [loading, setLoading] = useState(false);
  const [countCustomer, setCountCustomer] = useState(2);
  const [mode, setMode] = useState(0);
  const [boxLists, setBoxLists] = useState<API.BoxPageVo[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const intl = useIntl();

  const onCreate = async () => {
    if (loading) return;
    if (boxLists.length === 0) {
      return;
    }
    setLoading(true);
    const listIds = boxLists.map((list) => list.id);
    const ret = await createBattleUsingPOST({
      mode,
      countCustomer,
      pos: 1,
      boxLists: listIds.join(','),
      title: userInfo?.nickname || '',
    });
    setLoading(false);

    if (ret.status === 0) {
      onClose();
      getUser();
      history.push(`/battle/${ret.data}`);
    }
  };
  const countPrice = (boxs: API.BoxPageVo[]) => {
    let price = 0;
    boxs.forEach((t) => {
      price += t?.openPrice || 0;
    });
    setTotalPrice(price);
  };

  const addBox = (box: API.BoxPageVo) => {
    if (boxLists.length > 9) {
      return;
    }
    const boxs = [...boxLists, box];
    setBoxLists(boxs);
    countPrice(boxs);
  };

  const removeBox = (index: number) => {
    const newBoxLists = [...boxLists];
    newBoxLists.splice(index, 1);
    setBoxLists(newBoxLists);
    countPrice(newBoxLists);
  };

  const modeList = [
    {
      key: 0,
      name: intl.formatMessage({ id: 'room_mode_oh' }),
    },
    {
      key: 1,
      name: intl.formatMessage({ id: 'room_mode_fq' }),
    },
  ];

  return (
    <Modal open={show} className="w-full max-w-6xl max-h-full overflow-hidden">
      <Button
        size="xs"
        shape="circle"
        color="ghost"
        className="absolute right-2 top-2"
        onClick={onClose}
      >
        ✕
      </Button>
      <Modal.Header className="mb-2 text-center text-lg">
        <FormattedMessage id="arena_cjfy" />
      </Modal.Header>
      <Modal.Body className="max-h-[calc(100vh-84px)] overflow-y-scroll sm:overflow-y-auto w-full text-sm sm:text-base hide-scrollbar">
        <div className="flex flex-col gap-3">
          <div className="text-base-content">
            <FormattedMessage id="room_mode" />
          </div>
          <div className="flex gap-3">
            {modeList.map((mod) => (
              <div
                className={`relative flex text-sm justify-center items-center gap-1 border-[1px] border-transparent cursor-pointer rounded-md px-4 py-1 outline-none ${
                  mode === mod.key ? 'bg-primary text-black' : 'border-white'
                }`}
                onClick={() => {
                  if (mod.key === 3 && countCustomer === 4) {
                    setCountCustomer(3);
                  }
                  setMode(mod.key);
                }}
                key={mod.key}
              >
                {mod.name}
              </div>
            ))}
          </div>
          <div className="text-base-content">
            <FormattedMessage id="room_player_num" />
          </div>
          <div className="flex gap-3">
            {Array.from({ length: mode === 3 ? 2 : 3 }, (v, i) => i + 2).map(
              (t: any, i) => (
                <div
                  key={i}
                  className={`flex text-sm justify-center items-center gap-1 border-[1px] border-transparent cursor-pointer rounded-md px-4 py-1 outline-none ${
                    t === countCustomer
                      ? 'bg-primary text-black'
                      : 'text-base-content border-white'
                  }`}
                  onClick={() => {
                    setCountCustomer(t);
                  }}
                >
                  {t}人
                </div>
              ),
            )}
          </div>
          <div className="text-base-content">
            <FormattedMessage id="room_xzmh" />
          </div>
          <div className="flex flex-wrap max-h-60 h-full overflow-y-scroll">
            {battleBoxs?.map((t) => (
              <div
                className="flex flex-col items-center gap-1 p-2 cursor-pointer"
                key={t.id}
                onClick={() => {
                  addBox(t);
                }}
              >
                <div className="w-20 h-20 flex justify-center items-center">
                  <img src={t.boxImage} />
                </div>
                <div className="flex font-num items-center gap-1">
                  <IconFont type="icon-coin" />
                  {t.openPrice}
                </div>
                <div className="text-xs truncate  w-20 text-center">
                  {t.boxName}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <span className="text-base-content">
              <FormattedMessage id="room_yxz" />: {boxLists.length} / 10
            </span>
            <div className="text-base-content">
              <FormattedMessage id="roll_detail_zjz" />:
              <CountUp
                end={numberFixed(totalPrice)}
                duration={1}
                decimals={2}
                separator=""
                className="font-num ml-2 text-primary"
              />
            </div>
          </div>
          <div className="flex flex-wrap bg-base-100 rounded-md">
            {boxLists?.map((t, index: number) => (
              <div
                className="flex flex-col items-center gap-1 p-2 cursor-pointer"
                key={index}
                onClick={() => {
                  removeBox(index);
                }}
              >
                <div className="w-20 h-20 flex justify-center items-center">
                  <img src={t.boxImage} />
                </div>
                <div className="flex font-num items-center gap-1">
                  <IconFont type="icon-coin" />
                  {t.openPrice}
                </div>
                <div className="text-xs truncate text-base-content text-opacity-80 w-20 text-center">
                  {t.boxName}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col my-6 items-center w-full sticky left-0 bottom-4 gap-2">
            <Button
              className="btn-primary w-full rounded max-w-xs"
              onClick={onCreate}
              loading={loading}
            >
              <FormattedMessage id="arena_cjfy" />
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
