import { IconFont } from '@/components/icons';
import { getMyBalanceLogUsingGET } from '@/services/front/gerenzhongxinxiangguan';
import { FormattedMessage, useRequest } from '@umijs/max';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

export default function BalanceRecord() {
  const [dataSource, setDataSource] = useState<API.MyBalanceLogVo[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);

  const { loading } = useRequest(
    async () => {
      const ret = await getMyBalanceLogUsingGET({
        page: page,
        pageSize: pageSize,
      });
      if (ret.data) {
        setDataSource(ret.data?.pageData || []);
        setTotal(ret.data.totalRows || 0);
      }
    },
    {
      refreshDeps: [page, pageSize],
    },
  );

  const gameColumns: ColumnsType<API.MyBalanceLogVo> = [
    {
      title: <FormattedMessage id="order_id" />,
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: <FormattedMessage id="action_type" />,
      dataIndex: 'actionTypeName',
      key: 'actionTypeName',
    },
    {
      title: <FormattedMessage id="balance_type" />,
      dataIndex: 'balanceType',
      render: (balanceType) => {
        switch (balanceType) {
          case 0:
            return <FormattedMessage id="profile_balance" />;
          case 1:
            return <FormattedMessage id="profile_integral" />;
        }
      },
    },
    {
      title: <FormattedMessage id="amount" />,
      dataIndex: 'amount',
      key: 'amount',
      render: (_, record: any) => {
        return (
          <span
            className={`${
              record.balanceType === 0 ? 'text-primary' : 'text-secondary'
            }`}
          >
            {record.eventType === 0 ? '+' : '-'}
            {record.balanceType === 0 ? (
              <>&nbsp;$</>
            ) : (
              <IconFont type="icon-coin" className="mx-1" />
            )}
            {record.amount}
          </span>
        );
      },
    },
    {
      title: <FormattedMessage id="balanceAfter" />,
      dataIndex: 'balanceAfter',
      key: 'balanceAfter',
      render: (text, record) => (
        <span
          className={`${
            record.balanceType === 0 ? 'text-primary' : 'text-secondary'
          }`}
        >
          {record.balanceType === 0 ? (
            <>$</>
          ) : (
            <IconFont type="icon-coin" className="mr-1" />
          )}
          {text}
        </span>
      ),
    },
    {
      title: <FormattedMessage id="create_time" />,
      dataIndex: 'createTime',
      key: 'createTime',
    },
  ];

  return (
    <Table
      columns={gameColumns}
      dataSource={dataSource}
      loading={loading}
      scroll={{
        x: 1000,
      }}
      pagination={{
        pageSize: pageSize,
        total: total,
        onChange: (page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        },
      }}
      className="w-full"
    ></Table>
  );
}
