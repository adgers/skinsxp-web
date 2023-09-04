import { numberFixed } from '@/utils';
import { FormattedMessage } from '@umijs/max';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { Button, Modal } from 'react-daisyui';
import { toast } from 'react-toastify';

export default function CaseModal({
  battleBoxs,
  show,
  onSelect,
  onClose,
  selectData,
}: {
  battleBoxs?: API.BoxPageVo[];
  show: boolean;
  onSelect: (data: API.BoxPageVo[]) => void;
  onClose: () => void;
  selectData: API.BoxPageVo[];
}) {
  const [boxLists, setBoxLists] = useState<API.BoxPageVo[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const onCreate = async () => {
    if (boxLists.length === 0) {
      return;
    }

    onSelect(boxLists);
  };
  const countPrice = (boxs: API.BoxPageVo[]) => {
    let price = 0;
    boxs.forEach((t) => {
      price += t?.openPrice || 0;
    });
    setTotalPrice(price);
  };

  const reduceBox = (box: API.BoxPageVo) => {
    const newBoxLists = [...boxLists];
    const index = newBoxLists.findIndex((x) => x.id === box.id);
    if (index > -1) {
      newBoxLists.splice(index, 1);
      setBoxLists(newBoxLists);
      countPrice(newBoxLists);
    }
  };

  const increaseBox = (box: API.BoxPageVo) => {
    if (boxLists.length > 9) {
      toast.error('You can only select up to 10 cases', {
        toastId: 'case_limit',
      });
      return;
    }
    const newBoxLists = [...boxLists];
    newBoxLists.push(box);
    setBoxLists(newBoxLists);
    countPrice(newBoxLists);
  };

  useEffect(() => {
    if (show) {
      setBoxLists(selectData);
      countPrice(selectData);
    }
  }, [show]);

  return (
    <Modal
      open={show}
      className="w-full max-w-6xl max-h-full overflow-hidden px-3 sm:px-5"
    >
      <Button
        size="xs"
        shape="circle"
        color="ghost"
        className="absolute right-2 top-2"
        onClick={onClose}
      >
        ✕
      </Button>
      <Modal.Header className="mb-4 text-center text-lg font-semibold uppercase text-white">
        <FormattedMessage id="battle_select_cases" />
      </Modal.Header>
      <Modal.Body>
        <div className="max-h-[500px] overflow-y-scroll sm:overflow-y-auto w-full hide-scrollbar p-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {battleBoxs?.map((t) => {
              //判断是否在boxList中，并统计数量
              const isSelect = boxLists.find((x) => x.id === t.id);
              const count = boxLists.filter((x) => x.id === t.id).length;

              return (
                <div
                  className={`w-full h-full relative overflow-hidden cursor-pointer ring-1 ${
                    isSelect ? 'ring-green' : 'ring-transparent'
                  }`}
                  key={t.id}
                  onClick={() => {
                    if (isSelect) {
                      return;
                    }
                    increaseBox(t);
                  }}
                >
                  <img
                    src={t.boxImage}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute right-0 top-3 flex h-7 items-center justify-center rounded-sm px-2 bg-white bg-opacity-20 backdrop-blur">
                    <span className="text-xs font-semibold text-white">
                      ${t.openPrice}
                    </span>
                  </div>
                  <div className="absolute w-full bottom-4 left-0 text-sm text-white truncate text-center">
                    {t.boxName}
                  </div>
                  {isSelect && (
                    <div className="absolute left-0 top-0 flex w-full h-full items-center justify-center bg-black bg-opacity-80">
                      <div className="absolute left-1/2 top-1/2 z-20 mt-2 h-8 -translate-x-1/2 -translate-y-1/2 transform items-center justify-between flex">
                        <button
                          className="btn btn-sm bg-light font-bold text-white rounded-none border-0"
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            reduceBox(t);
                          }}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="input w-8 h-8 px-2 bg-transparent p-0 text-center text-xs font-semibold text-white outline-none focus:outline-none border border-light rounded-none"
                          value={count}
                        ></input>
                        <button
                          className="btn btn-sm bg-light font-bold text-white rounded-none border-0"
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            increaseBox(t);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center w-full justify-center mt-6">
          <Button
            className="btn-green max-w-xs uppercase font-semibold gap-1"
            onClick={onCreate}
          >
            <FormattedMessage id="roll_detail_zjz" />
            <div className="font-num ml-1">
              ${' '}
              <CountUp
                end={numberFixed(totalPrice)}
                duration={1}
                decimals={2}
                separator=""
              />
            </div>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
