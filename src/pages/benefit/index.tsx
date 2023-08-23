import {
  listCycleRedPacketUsingGET,
  receiveUsingPOST,
} from '@/services/front/hongbaoxiangguan';
import { FormattedMessage, useIntl, useModel, useRequest } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-daisyui';
import { toast } from 'react-toastify';
import './index.less';
import RedBag from './rebBag';

export default function Benefit() {
  const { benefitShow, hideBenefit, getUser } = useModel('user');
  const [tab, setTab] = useState(0);

  const intl = useIntl();

  const { data: redBagList } = useRequest(
    () => {
      if (tab === 1) {
        return listCycleRedPacketUsingGET({
          type: 2,
        });
      }
    },
    {
      refreshDeps: [tab],
    },
  );

  const codeRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (benefitShow && tab === 0) {
      codeRef.current?.focus();
    }
  }, [benefitShow, tab]);

  const onGetBenefit = async () => {
    const val = codeRef?.current?.value;
    if (!val) {
      return;
    }
    const ret = await receiveUsingPOST({
      code: val,
    });
    if (ret.status === 0) {
      toast.success(
        intl.formatMessage({
          id: 'wc_cdkey_redeemed_success',
        }),
      );
      getUser();
    }
  };

  return (
    <Modal
      open={benefitShow}
      className="w-full max-w-2xl max-h-full overflow-hidden rounded-md"
    >
      <Button
        size="xs"
        shape="circle"
        color="ghost"
        className="absolute right-2 top-2"
        onClick={hideBenefit}
      >
        ✕
      </Button>
      <Modal.Header className="mb-2 text-center text-lg">
        <div className="custom-tab flex w-full justify-center gap-6">
          <div
            className={`tab-item ${tab === 0 ? 'tab-active' : ''}`}
            onClick={() => setTab(0)}
          >
            <span className="tab-item-c uppercase">
              <FormattedMessage id="wc_cdkey_title" />
            </span>
          </div>
          <div
            className={`tab-item ${tab === 1 ? 'tab-active' : ''}`}
            onClick={() => setTab(1)}
          >
            <span className="tab-item-c uppercase">
              <FormattedMessage id="wc_rewards_title" />
            </span>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body className="w-full flex flex-col items-center mt-5">
        {tab === 0 && (
          <>
            <div className="text-sm">
              <FormattedMessage id="wc_cdkey_explain" />
            </div>
            <div className="benefit-bg">
              <div className="benefit-info flex flex-col gap-1">
                <div className="benefit-title uppercase">
                  <FormattedMessage id="wc_cdkey_title" />
                </div>
                <input
                  type="text"
                  className="benefit-input"
                  maxLength={12}
                  ref={codeRef}
                />
              </div>
              <div className="benefit-btn uppercase" onClick={onGetBenefit}>
                <FormattedMessage id="wc_cdkey_open"/>
              </div>
            </div>
          </>
        )}
        {tab === 1 && (
          <div className="flex flex-col items-center gap-4 w-full">
            {redBagList &&
              redBagList?.map((item, i) => <RedBag data={item} key={i} />)}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
