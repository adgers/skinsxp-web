import { DownOutlined } from '@ant-design/icons';
import { Disclosure } from '@headlessui/react';
import { useEffect, useRef } from 'react';

export default function DisclosureItem({
  title,
  content,
  isDefaultOpen,
}: {
  title: string;
  content: string;
  isDefaultOpen?: boolean;
}) {
  const disclosureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDefaultOpen && disclosureRef.current) {
      disclosureRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [isDefaultOpen]);

  return (
    <div ref={disclosureRef}>
      <Disclosure defaultOpen={isDefaultOpen}>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-betweenbg-dark px-4 py-4 text-left text-sm font-medium rounded">
              <span>{title}</span>
              <DownOutlined
                className={`${open ? 'rotate-180 transform' : ''} `}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-base-content text-opacity-80">
              <div
                dangerouslySetInnerHTML={{ __html: content }}
                className="prose-sm prose-slate"
              />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
