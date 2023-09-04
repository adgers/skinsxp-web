import { IconFont } from '@/components/icons';
import { getSteamLoginUrl } from '@/utils';
import { useModel } from '@umijs/max';
import { useEffect, useState } from 'react';
import { Button, Checkbox, Modal } from 'react-daisyui';
import { toast } from 'react-toastify';

export default function LoginConfirm() {
  const { steamLoginShow, hideSteamLogin } = useModel('user');

  const [agreeForm, setAgreeForm] = useState({
    form_1_agree: false,
    form_2_agree: false,
  });
  useEffect(() => {
    if (!steamLoginShow) {
      setAgreeForm({
        form_1_agree: false,
        form_2_agree: false,
      });
    }
  }, [steamLoginShow]);
  return (
    <Modal
      open={steamLoginShow}
      className="w-full max-w-2xl max-h-full overflow-hidden rounded-md border-none"
    >
      <Button
        size="xs"
        shape="circle"
        color="ghost"
        className="absolute right-2 top-2"
        onClick={() => hideSteamLogin()}
      >
        ✕
      </Button>
      <Modal.Header>
        <div
          className="w-full flex items-center justify-center text-[32px] font-bold"
          style={{
            background: 'linear-gradient(87deg, #4CFE7E 0%, #90FE4C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textTransform: 'uppercase',
          }}
        >
          WGSkins
        </div>
      </Modal.Header>
      <Modal.Body className="flex flex-col items-center px-8 py-4">
        <div className="mb-8 text-xl font-semibold text-center">
          We need to make sure it is okay for you to use WGSkins, please confirm
          that:
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center">
            <Checkbox
              checked={agreeForm?.form_1_agree}
              className="mr-4"
              onClick={() => {
                setAgreeForm({
                  ...agreeForm,
                  form_1_agree: !agreeForm?.form_1_agree,
                });
              }}
            />
            <span className="text-white/50">
              I agree to the{' '}
              <a href="/docs/help/52" target="_blank" className="underline">
                Terms of Service
              </a>{' '}
              &nbsp; and &nbsp;
              <a href="/docs/help/51" target="_blank" className="underline">
                Privacy Policy
              </a>
            </span>
          </div>
          <div className="flex items-center">
            <Checkbox
              checked={agreeForm?.form_2_agree}
              className="mr-4"
              onClick={() => {
                setAgreeForm({
                  ...agreeForm,
                  form_2_agree: !agreeForm?.form_2_agree,
                });
              }}
            />
            <span className="text-white/50">I am 18 years of age or older</span>
          </div>
        </div>
        <div
          className="btn btn-green mt-8 w-full md:w-[60%] "
          onClick={() => {
            if (!agreeForm?.form_1_agree || !agreeForm?.form_2_agree) {
              toast.error('Please read and agree to the agreement');
              return;
            }
            // onOK();
            hideSteamLogin();
            window.location.href = getSteamLoginUrl();
          }}
        >
          <IconFont type="icon-steam" className="mr-2" />
          Sign In
        </div>
      </Modal.Body>
    </Modal>
  );
}
