import { langs } from '@/utils';
import { DownOutlined } from '@ant-design/icons';
import { Menu, Transition } from '@headlessui/react';
import { getLocale, setLocale, useModel,FormattedMessage } from '@umijs/max';
import { Fragment } from 'react';
import { Button, Modal } from 'react-daisyui';

export default function SelectLang() {
  const { langShow, hideLang } = useModel('user');
  const locale = getLocale();
  const currentLoale = langs.filter((item) => item.value === locale)[0];

  const changeConfirmLocale = (val: string) => {
    setLocale(val);
  };

  return (
    <Modal open={langShow} className="overflow-visible w-[300px] sm:w-full max-w-md max-h-full">
      <Button
        size="xs"
        shape="circle"
        color="ghost"
        className="absolute right-2 top-2"
        onClick={hideLang}
      >
        ✕
      </Button>
      <Modal.Body className=" overflow-visible">
        <div className="text-center mb-8"><FormattedMessage id="choose_lang" /></div>
        <Menu as="div" className="relative w-full  sm:w-[80%] mx-auto">
          <Menu.Button
            className={
              'flex w-[100%] bg-black px-6 py-4 items-center justify-between'
            }
          >
            <div className="flex items-center gap-2">
              <img src={currentLoale.flag} className="w-5 h-5" />
              {currentLoale.title}
            </div>
            <DownOutlined />
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
            <Menu.Items className="z-50 flex flex-col focus:outline-none absolute  top-12 left-[0] origin-top-right rounded transform opacity-100 bg-black w-[100%] h-auto max-h-[180px] sm:max-h-[300px] overflow-y-scroll border border-light">
              {langs.map((item, i) => (
                <Menu.Item key={i}>
                  {({ active }) => (
                    <div
                      className={`${
                        active ? 'bg-accent bg-opacity-30 text-green' : ''
                      } flex items-center px-2 py-1 text-xs rounded cursor-pointer w-full`}
                      onClick={() => {
                        changeConfirmLocale(item.value);
                        hideLang();
                      }}
                    >
                      <img src={item.flag} className="w-5 h-5" />
                      <span className="pl-2 whitespace-nowrap">
                        {item.title}
                      </span>
                    </div>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </Modal.Body>
    </Modal>
  );
}
