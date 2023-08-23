import { getMyRetrievalPageUsingGET } from '@/services/front/gezhongjiluxiangguan';
import { FormattedMessage, useRequest } from '@umijs/max';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

export default function TakeRecord() {
  const [dataSource, setDataSource] = useState<API.MyRetrievalPageVo[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);

  const { loading } = useRequest(
    async () => {
      const ret = await getMyRetrievalPageUsingGET({
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
      title: '饰品',
      dataIndex: 'ornamentName',
      key: 'ornamentName',
    },
    {
      title: <FormattedMessage id="recoveryPrice" />,
      dataIndex: 'recoveryPrice',
      key: 'recoveryPrice',
    },
    {
      title: <FormattedMessage id="take_state" />,
      dataIndex: 'state',
      key: 'state',
      render: (state) => {
        switch (state) {
          case 0:
            return <FormattedMessage id="take_state0" />;
          case 1:
            return <FormattedMessage id="take_state1" />;
          case 2:
            return <FormattedMessage id="take_state2" />;
          case 3:
            return <FormattedMessage id="take_state3" />;
          case 4:
            return <FormattedMessage id="take_state4" />;
        }
      },
    },
    {
      title: <FormattedMessage id="createTime" />,
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: <FormattedMessage id="updateTime" />,
      dataIndex: 'updateTime',
      key: 'updateTime',
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
