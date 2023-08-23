import { documentPageUsingGET } from '@/services/common/tongyongxiangguan';
import { useParams } from '@umijs/max';
import DisclosureItem from './disclosureItem';
import { useRequest } from '@umijs/max';

export default function DocsPage() {
  const { data } = useRequest(() => documentPageUsingGET({ documentType: 0 }));
  const id = useParams<{ id: string }>()?.id;

  return (
    <div className="mx-auto w-full rounded p-4 flex flex-col gap-2">
      {data?.pageData?.map((item, index) => (
        <DisclosureItem
          title={item.title || ''}
          content={item.content || ''}
          isDefaultOpen={item.id === id}
          key={index}
        />
      ))}
    </div>
  );
}
