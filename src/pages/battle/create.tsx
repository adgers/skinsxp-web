import { IconFont } from '@/components/icons';
import {
  createBattleUsingPOST,
  getBattleDetailUsingGET,
} from '@/services/front/duizhanxiangguan';
import { boxPageUsingGET } from '@/services/front/kaixiangxiangguan';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Link,
  history,
  useIntl,
  useModel,
  useParams,
  useRequest,
} from '@umijs/max';
import { useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { toast } from 'react-toastify';
import BoxDetail from './boxDetail';
import CaseModal from './caseModal';

interface IBattleBox {
  boxName: string;
  boxImage: string;
  count: number;
  openPrice: number;
  id: number;
}

export default function Create() {
  const { userInfo, getUser } = useModel('user');
  const [loading, setLoading] = useState(false);
  const [countCustomer, setCountCustomer] = useState(2);
  const [mode, setMode] = useState(0);
  const [boxLists, setBoxLists] = useState<API.BoxPageVo[]>([]);
  const [boxListArr, setBoxListArr] = useState<IBattleBox[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const battleCode = useParams<{ id: string }>()?.id;

  const [caseModalShow, setCaseModalShow] = useState(false);
  const [boxDetailShow, setBoxDetailShow] = useState(false);
  const [caseId, setCaseId] = useState(0);
  const [caseName, setCaseName] = useState('');
  const intl = useIntl();

  const battleBoxs = useRequest(
    () =>
      boxPageUsingGET({
        boxType: 1,
        moduleId: -1,
        page: 1,
        pageSize: 1000,
        visibleRoom: true,
      }),
    {
      cacheKey: 'battleBoxs',
    },
  );

  const countPrice = (boxs: API.BoxPageVo[]) => {
    let price = 0;
    boxs.forEach((t) => {
      price += t?.openPrice || 0;
    });
    setTotalPrice(price);
  };

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
      getUser();
      history.push(`/battle/${ret.data}`);
    }
  };

  const initBoxListArr = (boxList: API.BoxPageVo[]) => {
    const boxListMap = new Map();
    boxList.forEach((item) => {
      if (boxListMap.has(item.boxName)) {
        boxListMap.set(item.boxName, boxListMap.get(item.boxName) + 1);
      } else {
        boxListMap.set(item.boxName, 1);
      }
    });
    const arr: IBattleBox[] = [];
    boxListMap.forEach((value, key) => {
      arr.push({
        boxName: key,
        boxImage: boxList.find((item) => item.boxName === key)?.boxImage || '',
        count: value,
        openPrice: boxList.find((item) => item.boxName === key)?.openPrice || 0,
        id: boxList.find((item) => item.boxName === key)?.id || 0,
      });
    });

    setBoxListArr(arr);
  };

  const reduceBox = (box: API.BoxPageVo) => {
    const newBoxLists = [...boxLists];
    const index = newBoxLists.findIndex((x) => x.id === box.id);
    if (index > -1) {
      newBoxLists.splice(index, 1);
      setBoxLists(newBoxLists);
      initBoxListArr(newBoxLists);
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
    initBoxListArr(newBoxLists);
    countPrice(newBoxLists);
  };

  const onCaseSelect = (data: API.BoxPageVo[]) => {
    setBoxLists(data);
    setCaseModalShow(false);
    initBoxListArr(data);
    countPrice(data);
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

  const copyBattleData = async (battleCode: string) => {
    const ret = await getBattleDetailUsingGET({ battleCode });

    if (ret.status === 0 && ret.data) {
      const {
        mode,
        countCustomer: battleCountCustomer,
        boxList,
        totalPrice,
      } = ret.data;
      setMode(mode ?? 0);
      setCountCustomer(battleCountCustomer ?? 0);
      const lists = boxList?.map((item) => ({
        id: item.boxId,
        boxName: item.boxName,
        boxImage: item.boxImage,
        openPrice: item.boxPrice,
      }));
      setBoxLists(lists ?? []);
      setTotalPrice(totalPrice ?? 0);
      initBoxListArr(lists ?? []);
    }
  };

  const showBoxDetail = (caseId: number, caseName: string) => {
    setCaseId(caseId);
    setCaseName(caseName);
    setBoxDetailShow(true);
  };

  useEffect(() => {
    if (battleCode) {
      copyBattleData(battleCode);
    }
  }, [battleCode]);

  return (
    <div className="max-w-[1400px] w-full m-auto p-3">
      <div className="my-5 flex w-full border-b border-light lg:mt-8 lg:flex-row">
        <div className="-mb-px items-center border-b border-green pb-6 pr-6 font-semibold uppercase text-white flex">
          <Link className="-my-2 -ml-3 px-3 py-2 text-white" to="/battle">
            <LeftOutlined />
          </Link>
          Create Battle
        </div>
      </div>

      <div
        className={`bg-black rounded sm:rounded-md py-5 flex px-5 sm:px-8 items-center gap-2`}
      >
        <div className="flex gap-4 items-center">
          <div
            className={`w-[60px] h-[60px] flex items-center justify-center rounded-full relative ring ring-green`}
          >
            <span className="font-num text-white text-2xl">
              {boxLists?.length}
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 flex-nowrap">
            {boxLists?.map((item, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    showBoxDetail(item.id as number, item.boxName as string);
                  }}
                  className={`w-16 h-16 flex-shrink-0 sm:w-24 sm:h-24 flex justify-center items-center cursor-pointer`}
                >
                  <img src={item.boxImage} className="w-full h-full" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="my-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 flex-wrap gap-4">
        {boxListArr.map((item, i) => {
          return (
            <div className="relative h-80 w-full bg-black rounded-md" key={i}>
              <div className="flex flex-col h-64 w-full items-end justify-center rounded-lg pb-1 text-xs uppercase relative">
                <img
                  src={item.boxImage}
                  className="w-full h-full object-cover"
                />
                <p className="absolute left-0 bottom-4 w-full px-2 truncate text-center leading-tight text-white">
                  {item.boxName}
                </p>
              </div>
              <div className="absolute right-0 top-3 z-[20] flex h-7 items-center justify-center rounded-sm px-2 bg-white bg-opacity-20 backdrop-blur">
                <span className="text-xs font-semibold text-white">
                  ${item.openPrice}
                </span>
              </div>

              <div className="mt-4 z-20 flex items-center justify-between rounded-xl px-2.5">
                <button
                  className="btn btn-sm font-bold bg-light rounded-none"
                  type="button"
                  onClick={() => {
                    reduceBox(item);
                  }}
                >
                  -
                </button>
                <input
                  type="text"
                  className="input mx-1.5 h-auto w-full rounded-md border-0 bg-transparent text-center font-bold text-white outline-none focus:outline-none"
                  value={item.count}
                />
                <button
                  className="btn btn-sm bg-light font-bold text-white rounded-none"
                  type="button"
                  onClick={() => {
                    increaseBox(item);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}

        <div
          className="group flex h-80 cursor-pointer flex-col items-center justify-center rounded-lg bg-black"
          onClick={() => setCaseModalShow(true)}
        >
          <div className="flex w-10 h-10 rounded-full items-center justify-center bg-light hover:bg-opacity-70">
            <PlusOutlined className="font-bold text-lg text-white" />
          </div>
          <p className="mt-5 text-center text-sm font-semibold uppercase text-white">
            Add case
          </p>
        </div>
      </div>

      <div className="my-5 flex flex-col flex-wrap gap-4 sm:gap-8 border-y border-light py-5 sm:flex-row sm:items-center xl:flex-nowrap">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className="text-xs font-bold uppercase text-white">
              Number of players
            </p>
          </div>
          <p className="mt-1 text-xs font-medium text-white text-opacity-50">
            Cashback is increased for 3-4 player battles!
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:flex">
            {Array.from({ length: 3 }, (v, i) => i + 2).map((t: any, i) => (
              <button
                key={i}
                className={`btn btn-sm border rounded-sm ${
                  t === countCustomer ? 'border-green' : 'border-light'
                }`}
                onClick={() => {
                  setCountCustomer(t);
                }}
                type="button"
              >
                {t} Players
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className="text-xs font-bold uppercase text-white">
              Case Battle Mode
            </p>
          </div>
          <p className="mt-1 text-xs font-medium text-white text-opacity-50">
            Select your Case Battle mode
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:flex">
            {modeList.map((mod) => (
              <button
                type="button"
                className={`btn btn-sm border rounded-sm ${
                  mode === mod.key ? 'border-green' : 'border-light'
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
              </button>
            ))}
          </div>
        </div>
        <div className="flex h-min basis-full flex-col sm:flex-row xl:ml-auto xl:basis-auto">
          <div className="flex w-full sm:flex-row flex-col justify-center sm:justify-start gap-4 sm:gap-8">
            <div className="flex flex-row sm:flex-col gap-2 sm:gap-1 justify-center text-center sm:text-left">
              <p className="text-xs font-bold uppercase text-white">
                Total cost
              </p>
              <p className="text-xs font-medium text-white text-opacity-50">
                Total price of cases
              </p>
              <span className="text-base font-semibold leading-none text-green">
                ${totalPrice}
              </span>
            </div>
            <Button
              className="btn-purple uppercase font-semibold"
              loading={loading}
              onClick={onCreate}
            >
              <IconFont type="icon-battle" className='text-lg'/>
              Create case battle
            </Button>
          </div>
        </div>
      </div>

      <BoxDetail
        caseId={caseId}
        caseName={caseName}
        show={boxDetailShow}
        onClose={() => {
          setBoxDetailShow(false);
        }}
      />

      {battleBoxs?.data?.pageData && caseModalShow && (
        <CaseModal
          show={caseModalShow}
          onSelect={onCaseSelect}
          onClose={() => {
            setCaseModalShow(false);
          }}
          selectData={boxLists}
          battleBoxs={battleBoxs?.data?.pageData}
        />
      )}
    </div>
  );
}
