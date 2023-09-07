import { IconFont } from '@/components/icons';
import { getSteamLoginUrl } from '@/utils';
import { FormattedMessage, useModel } from '@umijs/max';
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
      className="w-full max-w-2xl max-h-full overflow-hidden rounded-md"
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
      <Modal.Header className="mb-4 w-full flex items-center justify-center ">
        <div
          className="text-[32px] font-bold"
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
          <FormattedMessage id="login_need_tip" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center">
            <Checkbox
              checked={agreeForm?.form_1_agree}
              className="mr-2"
              size="sm"
              onClick={() => {
                setAgreeForm({
                  ...agreeForm,
                  form_1_agree: !agreeForm?.form_1_agree,
                });
              }}
            />
            <span className="text-white/50 text-sm">
              <FormattedMessage id="login_agree" />{' '}
              <a href="/docs/help/52" target="_blank" className="underline">
                <FormattedMessage id="terms_of_service" />
              </a>
              &nbsp; <FormattedMessage id="register_he" /> &nbsp;
              <a href="/docs/help/51" target="_blank" className="underline">
                <FormattedMessage id="privacy_policy" />
              </a>
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Checkbox
              checked={agreeForm?.form_2_agree}
              className="mr-2"
              size="sm"
              onClick={() => {
                setAgreeForm({
                  ...agreeForm,
                  form_2_agree: !agreeForm?.form_2_agree,
                });
              }}
            />
            <span className="text-white/50">
              <FormattedMessage id="login_confirm_adult" />
            </span>
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
          <FormattedMessage id="sign_in" />
        </div>
      </Modal.Body>
    </Modal>
  );
}
