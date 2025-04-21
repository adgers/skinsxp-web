import { getMyRechargeOrderPageUsingGET } from '@/services/front/gezhongjiluxiangguan';
import { FormattedMessage, useRequest } from '@umijs/max';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

export default function RechargeRecord() {
  const [dataSource, setDataSource] = useState<API.MyRechargeOrderPageVo[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);

  const { loading } = useRequest(
    async () => {
      const ret = await getMyRechargeOrderPageUsingGET({
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

  const gameColumns: ColumnsType<API.MyRetrievalPageVo> = [
    {
      title: <FormattedMessage id="order_id" />,
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: <FormattedMessage id="channelName" />,
      dataIndex: 'channelName',
      key: 'channelName',
    },
    {
      title: <FormattedMessage id="pay_amount" />,
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => <span className="text-primary">R${text}</span>,
    },
    {
      title: <FormattedMessage id="pay_state" />,
      dataIndex: 'state',
      key: 'state',
      render: (state) => {
        switch (state) {
          case 0:
            return <FormattedMessage id="pay_state0" />;
          case 1:
            return <FormattedMessage id="pay_state1" />;
          case 2:
            return <FormattedMessage id="pay_state2" />;
        }
      },
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
