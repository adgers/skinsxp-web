import { IconFont } from '@/components/icons';
import { getMyUpgradePageUsingGET } from '@/services/front/gezhongjiluxiangguan';
import { FormattedMessage, Link, useRequest } from '@umijs/max';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

export default function DreamRecord() {
  const [dataSource, setDataSource] = useState<API.UpgradePageVo[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);

  const { loading } = useRequest(
    async () => {
      const ret = await getMyUpgradePageUsingGET({
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

  const gameColumns: ColumnsType<API.UpgradePageVo> = [
    {
      title: <FormattedMessage id="target_item" />,
      dataIndex: 'winVoucherName',
      key: 'winVoucherName',
      render: (_, record) => {
        return (
          <div className="flex gap-1">
            <img src={record.winVoucherImg} className="w-6 h-6" />{' '}
            {record?.winVoucherName}
          </div>
        );
      },
    },
    {
      title: <FormattedMessage id="dreamFee" />,
      dataIndex: 'dreamFee',
      key: 'dreamFee',
    },
    {
      title: <FormattedMessage id="rollcode_range" />,
      dataIndex: 'rollCode',
      key: 'rollCode',
      render: (_, record) => {
        return (
          <div>
            {record?.rollCodeLow}-{record?.rollCodeHigh}
          </div>
        );
      },
    },
    {
      title: <FormattedMessage id="rollcode" />,
      dataIndex: 'rollCode',
      key: 'rollCode',
      render: (_, record) => {
        return (
          <div className="text-secondary flex items-center gap-1">
            {record.rollCode}{' '}
            {record?.verifyId && (
              <Link to={`/profile/provably-fair/verify/${record.verifyId}`}>
                <IconFont type="icon-shield" className="text-success" />
              </Link>
            )}
          </div>
        );
      },
    },
    {
      title: <FormattedMessage id="result" />,
      dataIndex: 'state',
      key: 'state',
      render: (state) => {
        return state === 1 ? (
          <span className="text-success">WIN</span>
        ) : (
          <span className="text-error">FAIL</span>
        );
      },
    },
    {
      title: <FormattedMessage id="createTime" />,
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
