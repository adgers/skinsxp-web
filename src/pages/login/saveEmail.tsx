import { mailCodeUsingGET } from '@/services/common/tongyongxiangguan';
import { changeMailUsingPOST1 } from '@/services/front/gerenzhongxinxiangguan';
import { FormattedMessage, useIntl, useModel } from '@umijs/max';
import { useCountDown } from 'ahooks';
import { useRef, useState } from 'react';
import { Button, Input, Modal } from 'react-daisyui';
import { toast } from 'react-toastify';

export default function SaveEmail() {
  const { getUser, emailShow, hideEmail } = useModel('user');
  const intl = useIntl();
  const [targetDate, setTargetDate] = useState<number>();

  const [countdown] = useCountDown({
    targetDate,
  });
  const [loading, setLoading] = useState(false);


  const emailRef = useRef(null);
  const codeRef = useRef(null);

  const onSendEmail = async () => {
    const email = emailRef.current?.value;
    if (!email) {
      return;
    }
    if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email) === false) {
      toast.error(intl.formatMessage({ id: 'email_invail' }));
      return;
    }
    setTargetDate(Date.now() + 60000);
    const ret = await mailCodeUsingGET({
      mail: email,
    });
    if (ret.status === 0) {
      setTargetDate(Date.now() + 60000);
      toast.success(intl.formatMessage({ id: 'smscode_sent_success' }));
    }
  };

  const onSaveEmail = async () => {
    const email = emailRef.current?.value;
    const code = codeRef.current?.value;

    if (!email || !code) {
      return;
    }
    if (loading) {
      return;
    }

    setLoading(true);
    const ret = await changeMailUsingPOST1({
      mail: email,
      verifyCode: code,
    });
    setLoading(false);
    if (ret.status === 0) {
      toast.success(intl.formatMessage({ id: 'email_bind_success' }));
      hideEmail();
      getUser();
    }
  };

  return (
    <Modal open={false} className="max-w-lg">
      <Modal.Header className="flex items-center mb-2">
        <FormattedMessage id="bind_email" />
      </Modal.Header>
      <Button
        size="xs"
        shape="circle"
        color="ghost"
        className="absolute right-2 top-2"
        onClick={() => hideEmail()}
      >
        ✕
      </Button>
      <Modal.Body className="flex flex-col gap-4">
        <Input
          placeholder={intl.formatMessage({ id: 'input_email' })}
          ref={emailRef}
        />
        <div className="join">
          <Input
            placeholder={intl.formatMessage({ id: 'input_verify' })}
            className="join-item w-full mr-1"
            ref={codeRef}
          />
          <Button
            onClick={onSendEmail}
            className="join-item rounded  btn-green btn-outline hover:!text-white"
          >
            {countdown === 0 ? (
              <FormattedMessage id="verify_send" />
            ) : (
              intl
                .formatMessage({
                  id: 'smscode_cxfs',
                })
                .replace('%s', Math.round(countdown / 1000) as any)
            )}
          </Button>
        </div>
      </Modal.Body>
      <Modal.Actions className="flex flex-col mt-4">
        <Button
          className="btn-green w-full"
          onClick={onSaveEmail}
          loading={loading}
        >
          <FormattedMessage id="confirm" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
