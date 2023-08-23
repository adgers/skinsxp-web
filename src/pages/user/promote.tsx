import { bindInviterUsingPOST } from '@/services/front/gerenzhongxinxiangguan';
import {
  getPromotionInfoUsingGET,
  modifyInvitationCodeUsingPOST,
} from '@/services/front/tuiguangzhongxinxiangguan';
import { sleep } from '@/utils';
import { CopyOutlined, EditFilled } from '@ant-design/icons';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Input } from 'react-daisyui';
import { toast } from 'react-toastify';

export default function PromotePage() {
  const { data = {}, refresh } = useRequest(() => getPromotionInfoUsingGET());
  const [promoteCode, setPromoteCode] = useState<string>('');
  const [upInvitationCode, setUpInvitationCode] = useState<string>('');
  const [promotoEdit, setPromoteEdit] = useState<boolean>(false);
  const promoteRef = useRef<HTMLInputElement>(null);
  const invRef = useRef<HTMLInputElement>(null);
  const intl = useIntl();

  useEffect(() => {
    if (data?.invitationCode) {
      setPromoteCode(data?.invitationCode);
    }
    if (data?.upInvitationCode) {
      setUpInvitationCode(data?.upInvitationCode);
    }
  }, [data]);

  const onSavePromote = async () => {
    const code = promoteRef?.current?.value;

    if (!code) {
      return;
    }

    if (/^[0-9a-zA-Z]{6,15}$/g.test(code) === false) {
      toast.error(intl.formatMessage({ id: 'promoteCode_error' }));
      return;
    }
    const ret = await modifyInvitationCodeUsingPOST({
      invitationCode: code,
    });
    if (ret.status === 0) {
      toast.success(intl.formatMessage({ id: 'mine_xgcg' }));
      setPromoteEdit(false);
      refresh();
    }
  };

  const saveInvitationCode = async () => {
    const code = invRef?.current?.value;
    if (!code) return;

    const ret = await bindInviterUsingPOST({
      invitationCode: code,
    });
    if (ret.status === 0) {
      toast.success(intl.formatMessage({ id: 'mine_xgcg' }));
      refresh();
    }
  };

  return (
    <>
      <div className="bg-neutral p-4 md:p-6 rounded flex flex-col gap-4">
        <div>
          <h3 className="font-sembold text-base mb-4">
            <FormattedMessage id="promoteCode_mine" />
          </h3>
          <div className="flex gap-4">
            <Input
              value={promoteCode}
              disabled={!promotoEdit}
              className="w-full max-w-xl"
              placeholder={intl.formatMessage({
                id: 'promoteCode_placeholder',
              })}
              onChange={(e) => setPromoteCode(e.target.value)}
              ref={promoteRef}
            />
            {promotoEdit ? (
              <div className="flex gap-2">
                <button
                  className="btn btn-outline btn-secondary"
                  onClick={onSavePromote}
                  type="button"
                >
                  <FormattedMessage id="confirm" />
                </button>

                <button
                  className="btn btn-outline"
                  onClick={() => setPromoteEdit(false)}
                  type="button"
                >
                  <FormattedMessage id="cancel" />
                </button>
              </div>
            ) : (
              <button
                className="btn btn-outline btn-secondary"
                onClick={() => {
                  setPromoteEdit(true);
                  sleep(100).then(() => promoteRef.current?.focus());
                }}
                type="button"
              >
                <EditFilled />
                <FormattedMessage id="edit" />
              </button>
            )}
          </div>
        </div>
        <div>
          <h3 className="font-sembold text-base mb-4">
            <FormattedMessage id="promoteCode_myurl" />
          </h3>
          <div className="relative max-w-xl w-full">
            <Input
              value={`${window.location.origin}?promoteCode=${data?.invitationCode}`}
              disabled
              className="w-full"
            />
            <CopyToClipboard
              text={`${window.location.origin}?promoteCode=${data?.invitationCode}`}
              onCopy={() => {
                toast.success(intl.formatMessage({ id: 'copy_success' }));
              }}
            >
              <Button
                size="xs"
                shape="circle"
                color="ghost"
                className="absolute right-2 top-3"
              >
                <CopyOutlined />
              </Button>
            </CopyToClipboard>
          </div>
        </div>
        <div>
          <h3 className="font-sembold text-base mb-4 uppercase">
            <FormattedMessage id="promoteCode_upuser" />
          </h3>
          <div className="flex gap-2">
            {data && (
              <Input
                value={upInvitationCode}
                disabled={data?.upInvitationCode !== ''}
                className="w-full max-w-xl"
                onChange={(e) => setUpInvitationCode(e.target.value)}
                ref={invRef}
              />
            )}

            {data?.upInvitationCode === '' && (
              <button
                className="btn btn-outline btn-secondary"
                onClick={saveInvitationCode}
                type="button"
              >
                <EditFilled />
                <FormattedMessage id="confirm" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-4">
        <div className="bg-gradient-to-r from-[#44425E] to-[#131314] text-center px-3 py-4 flex flex-col gap-2 rounded">
          <div>
            <FormattedMessage id="promoteCode_level" />
          </div>
          <div className="text-secondary font-num">{data?.promotionGrade}</div>
        </div>
        <div className="bg-gradient-to-r from-[#44425E] to-[#131314] text-center px-3 py-4 flex flex-col gap-2 rounded">
          <div>
            <FormattedMessage id="promoteCode_rebate" />
          </div>
          <div className="text-secondary font-num">{data?.rebateRate}%</div>
        </div>
        <div className="bg-gradient-to-r from-[#44425E] to-[#131314] text-center px-3 py-4 flex flex-col gap-2 rounded">
          <div>
            <FormattedMessage id="promoteCode_nextlevel" />
          </div>
          <div className="text-secondary font-num">
            {(data?.nextPromotionGrade || 0) -
              (data?.accumulatedRechargeAmount || 0)}
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#44425E] to-[#131314] text-center px-3 py-4 flex flex-col gap-2 rounded">
          <div>
            <FormattedMessage id="promoteCode_user_num" />
          </div>
          <div className="text-secondary font-num">
            {data?.accumulatedRegisterCount}
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#44425E] to-[#131314] text-center px-3 py-4 flex flex-col gap-2 rounded">
          <div>
            <FormattedMessage id="promoteCode_recharge" />
          </div>
          <div className="text-secondary font-num">
            {data?.accumulatedRechargeAmount}
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#44425E] to-[#131314] text-center px-3 py-4 flex flex-col gap-2 rounded">
          <div>
            <FormattedMessage id="promoteCode_rebate_num" />
          </div>
          <div className="text-secondary font-num">
            {data?.accumulatedRebateAmount}
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-col mt-4">
        <div className="uppercase">
          <FormattedMessage id="promoteCode_rule" />
        </div>
        <div className="text-base-content text-opacity-50 text-sm leading-7">
          <div
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage({ id: 'promoteCode_rule_content' }),
            }}
          ></div>
        </div>
      </div>
    </>
  );
}
