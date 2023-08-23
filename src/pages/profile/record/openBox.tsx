import { IconFont } from '@/components/icons';
import { getMyBoxLogPageUsingGET } from '@/services/front/gezhongjiluxiangguan';
import { FormattedMessage, Link, useRequest } from '@umijs/max';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

export default function OpenBoxRecord() {
  const [dataSource, setDataSource] = useState<API.MyBoxLogPageVo[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);

  const { loading } = useRequest(
    async () => {
      const ret = await getMyBoxLogPageUsingGET({
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

  const gameColumns: ColumnsType<API.MyBoxLogPageVo> = [
    {
      title: <FormattedMessage id="boxName" />,
      dataIndex: 'boxName',
      key: 'boxName',
    },
    {
      title: <FormattedMessage id="voucherName" />,
      dataIndex: 'voucherName',
      key: 'voucherName',
    },
    {
      title: <FormattedMessage id="recoveryPrice" />,
      dataIndex: 'recoveryPrice',
      key: 'recoveryPrice',
    },
    {
      title: <FormattedMessage id="rollcode" />,
      dataIndex: 'rollCode',
      key: 'rollCode',
      render: (_, record) => {
        return (
          <div className="text-secondary flex items-center gap-1">
            {record.rollCode}{' '}
            <Link to={`/user/provably-fair/verify/${record.verifyId}`}>
              <IconFont type="icon-shield" className="text-success" />
            </Link>
          </div>
        );
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
