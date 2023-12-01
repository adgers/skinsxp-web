import { IconFont } from '@/components/icons';
import { getSteamLoginUrl } from '@/utils';
import { Turnstile } from '@marsidev/react-turnstile';
import { FormattedMessage, getLocale, useIntl, useModel } from '@umijs/max';
import { useEffect, useState } from 'react';
import { Button, Checkbox, Modal } from 'react-daisyui';
import { toast } from 'react-toastify';

export default function LoginConfirm() {
  const { steamLoginShow, hideSteamLogin } = useModel('user');
  const [loading, setLoading] = useState(false);
  const [cloudToken, setCloudToken] = useState('');
  const locale = getLocale();
  const intl = useIntl();

  const [agreeForm, setAgreeForm] = useState({
    form_1_agree: true,
    form_2_agree: true,
  });
  useEffect(() => {
    setLoading(false);
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
        <div className="w-[164px]">
          <img src={require('@/assets/wg-logo.png')} />
        </div>
      </Modal.Header>
      <Modal.Body className="flex flex-col items-center px-8 py-4">
        <div
          className="mb-8 text-xl font-semibold text-center"
          onClick={() => {
            window?.fbq(
              'trackSingleCustom',
              '1024868335308144',
              'click_confirm_LOGIN',
            );
          }}
        >
          <FormattedMessage id="login_need_tip" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center">
            <Checkbox
              checked={agreeForm?.form_1_agree}
              className="mr-2"
              size="xs"
              color="primary"
              onClick={() => {
                setAgreeForm({
                  ...agreeForm,
                  form_1_agree: !agreeForm?.form_1_agree,
                });
              }}
            />
            <span className="text-white/80 text-sm">
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
              size="xs"
              color="primary"
              onClick={() => {
                setAgreeForm({
                  ...agreeForm,
                  form_2_agree: !agreeForm?.form_2_agree,
                });
              }}
            />
            <span className="text-white/80">
              <FormattedMessage id="login_confirm_adult" />
            </span>
          </div>
        </div>
        {/* <Turnstile
          siteKey="0x4AAAAAAAN4Ou8ut65lzmuz"
          onError={() => {
            console.warn('you===bot');
          }}
          onSuccess={(token: string) => {
            setCloudToken(token);
          }}
          options={{
            theme: 'light',
            language: locale,
            retryInterval: 8000
          }}
          className="mx-auto mt-3"
          scriptOptions={{
          }}
        /> */}
        <Button
          className="btn btn-green mt-8 w-full md:w-[60%] "
          onClick={() => {
            if (!agreeForm?.form_1_agree || !agreeForm?.form_2_agree) {
              toast.error(intl.formatMessage({ id: 'register_qydbjsxy' }));
              return;
            }
            // if (!cloudToken) {
            //   toast.error(intl.formatMessage({ id: 'bot_verify_tip' }));
            //   return;
            // }
            // onOK();
            // hideSteamLogin();
            setLoading(true);
            window.location.href = getSteamLoginUrl();
          }}
          loading={loading}
        >
          <IconFont type="icon-steam" className="mr-2" />
          <FormattedMessage id="sign_in" />
        </Button>
      </Modal.Body>
    </Modal>
  );
}
