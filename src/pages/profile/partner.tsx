import { IconFont } from '@/components/icons';
import {
  getPromotionInfoUsingGET,
  listUsingGET1,
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
  const { data: promotionList = [] } = useRequest(() => listUsingGET1());

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
  const [tab, setTab] = useState<'rank' | 'history'>('rank');

  const promoteRef = useRef<HTMLInputElement>(null);
  const invRef = useRef<HTMLInputElement>(null);
  const intl = useIntl();

  const affliateColumns: ColumnsType<API.MyPromotionLogPageVo> = [
    {
      title: <FormattedMessage id="promote_user" />,
      dataIndex: 'nickname',
      key: 'nickname',
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
      title: <FormattedMessage id="updateTime" />,
      dataIndex: 'createTime',
      key: 'createTime',
    },
  ];
  const rankColumns: ColumnsType<API.Promotion> = [
    {
      title: <FormattedMessage id="promoteCode_level" />,
      dataIndex: 'grade',
      key: 'grade',
      width: '10%',
      render: (text) => <span className="pl-4">{text}</span>,
    },
    {
      title: <FormattedMessage id="partner_next_level" />,
      dataIndex: 'rebateAmountMin',
      key: 'rebateAmountMin',
      width: '30%',
      render: (text, record, index) => {
        return (
          <div className="font-num">
            {index === promotionList?.length - 1 ? (
              <span className="text-white font-bold">
                ${record?.rebateAmountMin}
              </span>
            ) : (
              <>
                <span className="text-white font-bold">${text}</span>{' '}
                {record?.rebateAmountMax && `/${record?.rebateAmountMax}`}
              </>
            )}
          </div>
        );
      },
    },
    {
      title: <FormattedMessage id="promoteCode_rebate" />,
      dataIndex: 'rebateRate',
      key: 'rebateRate',
      width: '30%',
      render: (text, record) => (
        <span
          className={`font-num ${
            data?.promotionGrade === record.grade ? 'text-green font-bold' : ''
          }`}
        >
          {text} %
        </span>
      ),
    },
    {
      title: <FormattedMessage id="partner_rebate" />,
      dataIndex: 'userRebateValue',
      key: 'userRebateValue',
      width: '30%',
      render: (text, record) => (
        <span className="font-num">
          {record.userRebateType === 0 ? `${text}%` : `$${text}`}
        </span>
      ),
    },
  ];

  const stepsArr = [
    {
      icon: 'icon-invitation',
      desc: 'partner_step1',
    },
    {
      icon: 'icon-connection',
      desc: 'partner_step2',
    },
    {
      icon: 'icon-levelup',
      desc: 'partner_step3',
    },
    {
      icon: 'icon-benefit',
      desc: 'partner_step4',
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
      refreshDeps: [searchParams.page, searchParams.pageSize, tab],
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
      <div className="p-4 flex gap-4 bg-black rounded">
        <div className="flex items-start flex-col lg:flex-row lg:items-center gap-4 sm:gap-8 flex-shrink-0">
          <div className="w-full">
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
            <div className="mt-4 flex gap-2 items-center">
              <FormattedMessage id="promoteCode_myurl" />
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
        </div>
      </div>
      <div className="p-4 bg-black rounded mt-4 flex justify-center flex-wrap gap-12 py-6">
        {stepsArr.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center gap-4 md:max-w-[284px]"
            >
              <div className='border border-green p-4 rounded-full'>
                <div className="border-[2px] border-green w-[60px] h-[60px] md:w-[120px] md:h-[120px] flex items-center justify-center rounded-full">
                  <IconFont
                    type={item.icon}
                    className="text-[36px] md:text-[72px] text-green"
                  />
                </div>
              </div>
              <div className="text-sm text-gray text-center ">
                <FormattedMessage id={item.desc} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 bg-black rounded mt-4">
        <div className="grid grid-cols-3 sm:grid-cols-6 flex-shrink-0">
          <div className="text-center px-3 py-4 flex flex-col gap-2 rounded-none bg-black">
            <div className="text-sm">
              <FormattedMessage id="promoteCode_level" />
            </div>
            <div className="text-white font-num text-lg">
              {data?.promotionGrade}
            </div>
          </div>
          <div className="text-center px-3 py-4 flex flex-col gap-2 rounded-none ">
            <div className="text-sm">
              <FormattedMessage id="promoteCode_rebate" />
            </div>
            <div className="text-white font-num text-lg">
              {data?.rebateRate || 0}%
            </div>
          </div>
          <div className="text-center px-3 py-4 flex flex-col gap-2 rounded-none ">
            <div className="text-sm">
              <FormattedMessage id="promoteCode_nextlevel" />
            </div>
            <div className="text-white font-num text-lg">
              {(data?.nextPromotionGrade || 0) -
                (data?.accumulatedRechargeAmount || 0)}
            </div>
          </div>
          <div className="text-center px-3 py-4 flex flex-col gap-2 rounded-none">
            <div className="text-sm">
              <FormattedMessage id="promoteCode_user_num" />
            </div>
            <div className="text-white font-num text-lg">
              {data?.accumulatedRegisterCount}
            </div>
          </div>
          <div className="text-center px-3 py-4 flex flex-col gap-2 rounded-none">
            <div className="text-sm">
              <FormattedMessage id="promoteCode_recharge" />
            </div>
            <div className="text-green font-num text-lg">
              ${data?.accumulatedRechargeAmount}
            </div>
          </div>
          <div className="text-center px-3 py-4 flex flex-col gap-2 rounded-none ">
            <div className="text-sm">
              <FormattedMessage id="promoteCode_rebate_num" />
            </div>
            <div className="text-green font-num text-lg">
              ${data?.accumulatedRebateAmount}
            </div>
          </div>
        </div>
      </div>

      <div className="custom-tab w-full flex mb-4 gap-8 text-white justify-center border-b border-[#45444B] h-[68px]">
        <div
          className={`tab-item flex items-center cursor-pointer h-full ${
            tab === 'rank'
              ? 'text-green border-b-[1px] border-green'
              : 'text-white '
          }`}
          onClick={() => setTab('rank')}
        >
          <FormattedMessage id="promoteCode_level" />
        </div>
        <div
          className={`tab-item flex items-center cursor-pointer h-full ${
            tab === 'history'
              ? 'text-green border-b-[1px] border-green'
              : 'text-white '
          }`}
          onClick={() => setTab('history')}
        >
          <FormattedMessage id="promote_user" />
        </div>
      </div>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        {tab === 'history' ? (
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
        ) : (
          <Table
            columns={rankColumns}
            dataSource={promotionList}
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
        )}
      </ConfigProvider>
    </>
  );
}
