import { IconFont } from '@/components/icons';
import {
  getPromotionInfoUsingGET,
  modifyInvitationCodeUsingPOST,
  myPromotionLogPageUsingGET,
} from '@/services/front/tuiguangzhongxinxiangguan';
import { CopyOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { ConfigProvider, theme } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Input } from 'react-daisyui';
import { toast } from 'react-toastify';

export default function PromotePage() {
  const { data = {}, refresh } = useRequest(() => getPromotionInfoUsingGET());
  const [promoteCode, setPromoteCode] = useState<string>('');
  const [upInvitationCode, setUpInvitationCode] = useState<string>('');
  const [promotoEdit, setPromoteEdit] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 1,
    pageSize: 25,
  });
  const [dataSource, setDataSource] = useState<API.MyPromotionLogPageVo[]>([]);
  const [total, setTotal] = useState(0);

  const promoteRef = useRef<HTMLInputElement>(null);
  const invRef = useRef<HTMLInputElement>(null);
  const intl = useIntl();

  const affliateColumns: ColumnsType<API.MyRechargeOrderPageVo> = [
    {
      title: <FormattedMessage id="nickName" />,
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: <FormattedMessage id="promoteCode_recharge" />,
      dataIndex: 'rechargeQuantity',
      key: 'rechargeQuantity',
    },
    {
      title: <FormattedMessage id="promoteCode_rebate" />,
      dataIndex: 'rebateRate',
      key: 'rebateRate',
      render: (text) => <span className="text-secondary">{text} %</span>,
    },
    {
      title: <FormattedMessage id="promoteCode_rebate_num" />,
      dataIndex: 'rebateAmount',
      key: 'rebateAmount',
    },
    {
      title: <FormattedMessage id="createTime" />,
      dataIndex: 'createTime',
      key: 'createTime',
    },
  ];

  const { loading } = useRequest(
    async () => {
      const ret = await myPromotionLogPageUsingGET({
        ...searchParams,
      });
      if (ret.data) {
        setDataSource(ret.data?.pageData || []);
        setTotal(ret.data.totalRows || 0);
      }
    },
    {
      refreshDeps: [searchParams.page, searchParams.pageSize],
    },
  );

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

  // const saveInvitationCode = async () => {
  //   const code = promoteRef?.current?.value;
  //   if (!code) return;

  //   const ret = await bindInviterUsingPOST({
  //     invitationCode: code,
  //   });
  //   if (ret.status === 0) {
  //     toast.success(intl.formatMessage({ id: 'mine_xgcg' }));
  //     refresh();
  //   }
  // };

  return (
    <>
      <div className="py-4 md:py-6 d flex flex-col gap-4">
        <div className="flex items-start flex-col lg:flex-row lg:items-center gap-4">
          <div className="w-full lg:w-1/2">
            <h3 className="font-sembold text-base mb-4">
              <FormattedMessage id="promoteCode_mine" />
            </h3>
            <div className="flex gap-4">
              <Input
                value={promoteCode}
                className="w-full max-w-xl rounded border-light"
                placeholder={intl.formatMessage({
                  id: 'promoteCode_placeholder',
                })}
                onChange={(e) => setPromoteCode(e.target.value)}
                ref={promoteRef}
              />
              <div
                className="btn btn-green rounded-none"
                onClick={() => {
                  onSavePromote();
                }}
              >
                <FormattedMessage id="confirm" />
              </div>
            </div>
            <div className="text-gray mt-4">
              <IconFont type="icon-attention" className='mr-2'/>
              Enter a new affiliate code and click "SAVE", if you want to change
              the current one
            </div>
          </div>
          <div className="flex justify-start items-center w-full lg:justify-center lg:w-1/2">
            <FormattedMessage id="promoteCode_myurl" />:{' '}
            <span className="text-green text-sm">{`${window.location.origin}?promoteCode=${promoteCode}`}</span>
            <CopyToClipboard
              text={`${window.location.origin}?promoteCode=${promoteCode}`}
              onCopy={() => {
                toast.success(intl.formatMessage({ id: 'copy_success' }));
              }}
            >
              <Button
                size="xs"
                shape="circle"
                className="text-gray rounded-none bg-transparent border-none hover:bg-transparent"
              >
                <CopyOutlined />
              </Button>
            </CopyToClipboard>
          </div>
        </div>

        {/* <div>
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
        </div> */}
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 mt-4 border border-light border-collapse text-gray">
        <div className="text-center px-3 py-4 flex flex-col gap-2 rounded-none border-r  border-light ">
          <div>
            <FormattedMessage id="promoteCode_level" />
          </div>
          <div className="text-white font-num">{data?.promotionGrade}</div>
        </div>
        <div className="text-center px-3 py-4 flex flex-col gap-2 rounded-none border-r  border-light ">
          <div>
            <FormattedMessage id="promoteCode_rebate" />
          </div>
          <div className="text-white font-num">{data?.rebateRate}%</div>
        </div>
        <div className="text-center px-3 py-4 flex flex-col gap-2 rounded-none border-r  border-light ">
          <div>
            <FormattedMessage id="promoteCode_nextlevel" />
          </div>
          <div className="text-white font-num">
            {(data?.nextPromotionGrade || 0) -
              (data?.accumulatedRechargeAmount || 0)}
          </div>
        </div>
        <div className="text-center px-3 py-4 flex flex-col gap-2 rounded-none border-r  border-light ">
          <div>
            <FormattedMessage id="promoteCode_user_num" />
          </div>
          <div className="text-white font-num">
            {data?.accumulatedRegisterCount}
          </div>
        </div>
        <div className="text-center px-3 py-4 flex flex-col gap-2 rounded-none border-r  border-light ">
          <div>
            <FormattedMessage id="promoteCode_recharge" />
          </div>
          <div className="text-white font-num">
            {data?.accumulatedRechargeAmount}
          </div>
        </div>
        <div className="text-center px-3 py-4 flex flex-col gap-2 rounded-none ">
          <div>
            <FormattedMessage id="promoteCode_rebate_num" />
          </div>
          <div className="text-white font-num">
            {data?.accumulatedRebateAmount}
          </div>
        </div>
      </div>
      <div className="box-title mt-10">Participants</div>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
        locale={{
          locale: 'en-US',
        }}
      >
        <Table
          columns={affliateColumns}
          dataSource={dataSource}
          loading={loading}
          scroll={{
            x: 1000,
          }}
          pagination={{
            pageSize: searchParams.pageSize,
            total: total,
            onChange: (page, pageSize) => {
              // setPage(page);
              // setPageSize(pageSize);
              setSearchParams({ ...searchParams, page, pageSize });
            },
          }}
          className="w-full"
        ></Table>
      </ConfigProvider>
    </>
  );
}
