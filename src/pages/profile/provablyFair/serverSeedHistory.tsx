import { keyHistoryUsingGET } from '@/services/front/miyaozhongzixiangguan';
import { useRequest } from '@umijs/max';
import { Pagination } from 'antd';
import { useState } from 'react';
import { Button, Modal } from 'react-daisyui';

export default function ServerSeedHistory({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [page, setPage] = useState(1);
  const pageSize = 3;

  const { data } = useRequest(
    () => {
      return keyHistoryUsingGET({
        page: page,
        pageSize: pageSize,
      });
    },
    {
      refreshDeps: [page],
    },
  );
  return (
    <Modal open={open} className="max-w-lg">
      <Modal.Header className="uppercase font-semibold leading-tight">
        Client Seed History
      </Modal.Header>
      <Button
        size="xs"
        shape="circle"
        color="ghost"
        className="absolute right-2 top-2"
        onClick={onClose}
      >
        ✕
      </Button>
      <Modal.Body className="grid gap-y-6">
        {data?.pageData?.map((item) => {
          return (
            <dl
              className="grid gap-y-px overflow-hidden break-all rounded-md text-xs leading-tight grid-cols-[auto_1fr]"
              key={item.id}
            >
              <dt className="whitespace-nowrapbg-dark-700 p-3 font-bold">
                SERVER SEED
              </dt>
              <dd className="bg-base-100 bg-opacity-30 p-3">
                {item.secretHash}
              </dd>
              <dt className="whitespace-nowrapbg-dark-700 p-3 font-bold ">
                SECRET SALT
              </dt>
              <dd className="bg-base-100 bg-opacity-30 p-3">
                {item.secretSalt}
              </dd>
              <dt className="whitespace-nowrapbg-dark-700 p-3 font-bold ">
                PUBLIC HASH
              </dt>
              <dd className="bg-base-100 bg-opacity-30 p-3">
                {item.publicHash}
              </dd>
              <dt className="whitespace-nowrapbg-dark-700 p-3 font-bold ">
                ROUND
              </dt>
              <dd className="bg-base-100 bg-opacity-30 p-3">{item.round}</dd>
              <dt className="whitespace-nowrapbg-dark-700 p-3 font-bold ">
                DATE
              </dt>
              <dd className="bg-base-100 bg-opacity-30 p-3">
                {item.createTime}
              </dd>
            </dl>
          );
        })}

        {data?.totalRows && data?.totalRows > pageSize && (
          <div className="flex justify-center items-center mt-2">
            <Pagination
              current={page}
              total={data?.totalRows}
              pageSize={pageSize}
              showSizeChanger={false}
              onChange={(page: number) => {
                setPage(page);
              }}
            />
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
