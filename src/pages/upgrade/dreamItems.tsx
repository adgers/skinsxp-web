import WeaponCard from '@/components/weaponCard';
// import { EXTERIOR, WEAPON_TYPE } from '@/constants';
import { pageUsingGET1 } from '@/services/front/shengjixiangguan';
import { Menu, Transition } from '@headlessui/react';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Pagination } from 'antd';
import { Fragment, useRef, useState } from 'react';
import { Button, Modal } from 'react-daisyui';

export default function DreamItems({
  show,
  onClose,
  onSelect,
}: {
  show: boolean;
  onClose: () => void;
  onSelect: (item: API.UpgradeGiftPageVo) => void;
}) {
  const [current, setCurrent] = useState(1);
  const pageSize = 24;

  const keywordRef = useRef<HTMLInputElement>(null);

  const [exterior, setExterior] = useState('');
  const [weaponType, setWeaponType] = useState('');
  const [keyword, setKeyword] = useState('');
  const [orderByPrice, setOrderByPrice] = useState<boolean>(true);
  const intl = useIntl();

  const { data } = useRequest(
    () => {
      if (show) {
        return pageUsingGET1({
          page: current,
          pageSize,
          giftName: keyword,
          exterior,
          type: weaponType,
          orderByPrice,
        });
      }
      return Promise.resolve({ data: { pageData: [] } });
    },
    {
      refreshDeps: [current, show, exterior, weaponType, keyword, orderByPrice],
      cacheKey: 'dreamItems',
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

  return (
    <Modal open={show} className="max-w-6xl">
      <Modal.Header className="mb-2 text-center text-lg uppercase">
        <FormattedMessage id="dream_chose_target" />
      </Modal.Header>
      <Button
        size="xs"
        shape="circle"
        color="ghost"
        className="absolute right-2 top-2"
        onClick={onClose}
      >
        ✕
      </Button>
      <Modal.Body className="overflow-y-scroll max-h-[600px] sm:overflow-y-auto sm:max-h-full min-h-[300px]">
        <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-between pt-4 px-3">
          <div className="flex gap-2 sm:gap-4 flex-1">
            <Menu as="div" className="relative w-40">
              <Menu.Button className="select select-sm select-accent border-opacity-50 rounded uppercase w-full font-semibold flex justify-between items-center focus:outline-none">
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
                <Menu.Items className="absolute left-0 mt-2 w-full bg-dark ring-1 ring-accent rounded-sm origin-top-left p-2 z-50">
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
                <Menu.Items className="absolute left-0 mt-2 w-full bg-dark ring-1 ring-accent rounded origin-top-left p-2 z-50">
                  {/* {EXTERIOR.map((item, i) => (
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
                  ))} */}
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
                <Menu.Items className="absolute left-0 mt-2 w-full bg-dark ring-1 ring-accent rounded origin-top-left p-2 z-50 max-h-80 overflow-y-auto">
                  {/* {WEAPON_TYPE.map((item, i) => (
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
                  ))} */}
                </Menu.Items>
              </Transition>
            </Menu>
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

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {data?.pageData?.map((item, i: number) => {
            return (
              <div onClick={() => onSelect(item)} key={i}>
                <WeaponCard data={item} />
              </div>
            );
          })}
        </div>

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
      </Modal.Body>
    </Modal>
  );
}
