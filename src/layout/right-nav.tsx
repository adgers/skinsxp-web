import { getApiDomain } from '@/utils';
import {
  AndroidFilled,
  AppleFilled,
  MessageOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import { useResponsive } from 'ahooks';
import { QRCode } from 'antd';
import { useState } from 'react';
import { Button, Modal } from 'react-daisyui';

export default function RightNav() {
  const [showAppDownload, setShowAppDownload] = useState(false);
  const responsive = useResponsive();

  const openWin = (
    url: string,
    name: string,
    iWidth: number,
    iHeight: number,
  ) => {
    const iTop = (window.screen.availHeight - 30 - iHeight) / 2;
    const iLeft = (window.screen.availWidth - 10 - iWidth) / 2;

    const features =
      'height=' +
      iHeight +
      ',innerHeight=' +
      iHeight +
      ',width=' +
      iWidth +
      ',innerWidth=' +
      iWidth +
      ',top=' +
      iTop +
      ',left=' +
      iLeft +
      ',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no';

    window.open(url, name, features);
  };

  const kfLink = `${getApiDomain()}/api/common/redirectQQ`;

  return (
    <>
      <div className="fixed right-0 bottom-1/3 translate-y-1/2 z-50">
        <div
          className="bg-primary p-2 rounded-tl-md rounded-bl-md cursor-pointer text-center"
          onClick={() => {
            openWin(kfLink, '', 800, 600);
          }}
        >
          <MessageOutlined className="text-[#262635] text-[32px]" />
        </div>
        <div className="bg-secondary p-2 rounded-tl-md rounded-bl-md mt-2">
          <div
            className="flex flex-col gap-1 items-center cursor-pointer"
            onClick={() => setShowAppDownload(true)}
          >
            <MobileOutlined className="text-[#262635] text-[32px]" />
            <div className="text-[#262635] font-semibold uppercase">App</div>
          </div>
        </div>
      </div>
      <Modal
        open={showAppDownload}
        className="max-w-md rounded-md p-3 modal-download"
      >
        <Modal.Header className="flex justify-center mb-4 uppercase modal-title">
          WGSKINS App
        </Modal.Header>
        <Modal.Body className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2 items-center">
            <QRCode
              value={'https://www.baidu.com'}
              size={responsive.md ? 180 : 150}
              color="#000"
              bgColor="#fff"
            />
            <div className="font-semibold text-center flex gap-1">
              <AppleFilled />
              iOS
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <QRCode
              value={'https://www.baidu.com'}
              size={responsive.md ? 180 : 150}
              color="#000"
              bgColor="#fff"
            />
            <div className="font-semibold text-center flex gap-1">
              <AndroidFilled />
              Android
            </div>
          </div>
        </Modal.Body>

        <Button
          size="xs"
          shape="circle"
          color="ghost"
          className="absolute right-2 top-2"
          onClick={() => setShowAppDownload(false)}
        >
          ✕
        </Button>
        <Modal.Body className="flex flex-col gap-4"></Modal.Body>
      </Modal>
    </>
  );
}
