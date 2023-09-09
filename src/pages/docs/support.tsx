import { documentPageUsingGET } from '@/services/common/tongyongxiangguan';
import { LoadingOutlined } from '@ant-design/icons';
import { useParams, useRequest } from '@umijs/max';
import { Spin } from 'antd';
import DisclosureItem from './disclosureItem';

export default function DocsPage() {
  const { data, loading } = useRequest(() =>
    documentPageUsingGET({ documentType: 1 }),
  );
  const id = useParams<{ id: string }>()?.id;

  return (
    <Spin
      spinning={loading}
      indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} />}
    >
      <div className="w-full rounded flex flex-col gap-2 min-h-[200px]">
        {data?.pageData?.map((item, index) => (
          <DisclosureItem
            title={item.title || ''}
            content={item.content || ''}
            isDefaultOpen={item.id === id}
            key={index}
          />
        ))}
      </div>
    </Spin>
  );
}
