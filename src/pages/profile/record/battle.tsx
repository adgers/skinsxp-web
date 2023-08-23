import { getMyPageUsingGET } from '@/services/front/duizhanxiangguan';
import {
  FormattedMessage,
  Link,
  useIntl,
  useModel,
  useRequest,
} from '@umijs/max';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

export default function BattleRecord() {
  const [dataSource, setDataSource] = useState<API.BattleVo[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const intl = useIntl();

  const { userInfo } = useModel('user');
  const { loading } = useRequest(
    async () => {
      const ret = await getMyPageUsingGET({
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

  const gameColumns: ColumnsType<API.BattleVo> = [
    {
      title: <FormattedMessage id="battle_box" />,
      dataIndex: 'boxList',
      key: 'boxList',
      render: (boxs) => {
        return (
          <div className="flex gap-1">
            {boxs?.map((item: any, i: number) => (
              <img
                src={item.boxImage}
                className="w-6 h-6"
                title={item.boxName}
                key={i}
              />
            ))}
          </div>
        );
      },
    },
    {
      title: <FormattedMessage id="battle_totalPrice" />,
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      // render:(text) => <span className='text-secondary'>{text}</span>
    },
    {
      title: <FormattedMessage id="battle_mode" />,
      dataIndex: 'mode',
      key: 'mode',
      render: (mode) => {
        const battleMode = [
          intl.formatMessage({ id: 'room_mode_oh' }),
          intl.formatMessage({ id: 'room_mode_fq' }),
        ];

        return battleMode[mode];
      },
    },
    {
      title: <FormattedMessage id="battle_result" />,
      dataIndex: 'result',
      key: 'result',
      render(text, record) {
        const isWin =
          record?.winners?.findIndex(
            (item) => item.winnerId === userInfo?.id,
          ) !== -1;

        return isWin ? (
          <span className="text-success">WIN</span>
        ) : (
          <span className="text-error">FAIL</span>
        );
      },
    },
    {
      title: <FormattedMessage id="create_time" />,
      dataIndex: 'battleTime',
      key: 'battleTime',
    },
    {
      title: <FormattedMessage id="action" />,
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Link to={`/battle/${record.battleCode}`}>查看</Link>
      ),
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
