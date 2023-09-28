import { AndroidFilled } from '@ant-design/icons';
import { Popover, QRCode } from 'antd';

export default function RightNav() {
  const androidLink =
    'https://img.wgskins.com/cdn/app/9bf92b98ec9c4a00b5790ee433887287.apk.1.1';

  return (
    <>
      <div className="fixed bottom-1/3 translate-y-1/2 z-50 right-3">
        <Popover
          content={
            <QRCode
              value={androidLink}
              size={180}
              color="#000"
              bgColor="#fff"
            />
          }
          placement="left"
        >
          <div
            className="bg-primary p-2 rounded-full cursor-pointer text-center text-black"
            onClick={() => {
              setTimeout(() => {
                window.open(androidLink);
              });
            }}
          >
            <AndroidFilled className="text-[30px]" />
          </div>
        </Popover>
      </div>
    </>
  );
}
