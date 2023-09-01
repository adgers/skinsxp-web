import {
  currentKeyUsingGET,
  resetUsingPOST,
} from '@/services/front/miyaozhongzixiangguan';
import { EditFilled } from '@ant-design/icons';
import { FormattedMessage, useRequest } from '@umijs/max';
import { useToggle } from 'ahooks';
import { useRef, useState } from 'react';
import { Button, Input, Modal } from 'react-daisyui';
import { toast } from 'react-toastify';
import ClientSeedHistory from './clientSeedHistory';
import ServerSeedHistory from './serverSeedHistory';

export default function ProvablyConfig() {
  const [currentKey, setCurrentKey] = useState<API.RandKeyVo>();
  const [showLoading, setShowLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const { refresh } = useRequest(async () => {
    const ret = await currentKeyUsingGET();
    if (ret.status === 0) {
      setCurrentKey(ret.data);
    }
  });
  const seedRef = useRef<HTMLInputElement>(null);

  const [editSeedVisible, { toggle: toggleEditSeed }] = useToggle(false);
  const [clientSeedHistoryVisible, { toggle: toggleClientSeedHistory }] =
    useToggle(false);
  const [serverSeedHistoryVisible, { toggle: toggleServerSeedHistory }] =
    useToggle(false);

  const onResetClientSeed = async () => {
    const seed = seedRef.current?.value;
    if (!seed) {
      toast.error('Please input client seed');
      return;
    }
    setResetLoading(true);
    const ret = await resetUsingPOST({
      clientSeed: seed,
    });
    setResetLoading(false);
    if (ret.status === 0) {
      toast.success('Reset client seed successfully');
      toggleEditSeed();
      refresh();
    }
  };

  const showServerSeed = async () => {
    setShowLoading(true);
    const ret = await resetUsingPOST({});
    setShowLoading(false);
    if (ret.status === 0) {
      toast.success('Show server seed successfully');
      setCurrentKey(ret.data);
    }
  };

  return (
    <div className="flex flex-col space-y-4 mt-4 text-white max-w-4xl">
      <div className="flex flex-col lg:h-14 lg:flex-row">
        <div className="z-10 -mb-px flex h-full w-full items-center justify-center rounded-none bg-neutral py-2 text-center font-bold uppercase lg:py-1 lg:mb-0 lg:max-w-[250px]">
          Client Seed
        </div>
        <div className="flex h-full flex-1 flex-col items-center  border border-solid border-neutral-700  p-3 text-center md:flex-row lg:-ml-6  lg:pl-9">
          <span className="mx-3 break-all font-mono text-sm">
            {currentKey?.clientSeed}
          </span>
          <div className="mt-3 flex space-x-3 md:ml-auto md:mt-0">
            <button
              onClick={toggleEditSeed}
              type="button"
              className="flex gap-1 h-10 items-center justify-center rounded-none border border-solid border-neutral-500 px-4 text-sm font-bold uppercase leading-none transition-colors duration-150 hover:bg-neutral-700 "
            >
              <EditFilled />
              Edit Client Seed
            </button>
            <button
              onClick={toggleClientSeedHistory}
              type="button"
              className="flex h-10 items-center justify-center rounded-none border border-solid border-neutral-500 px-4 text-sm font-bold uppercase leading-none transition-colors duration-150 hover:bg-neutral-700"
            >
              Client Seed History
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:h-14 lg:flex-row">
        <div className="z-10 -mb-px flex h-full w-full items-center justify-center rounded-none bg-neutral py-2 text-center font-bold uppercase lg:py-1 lg:mb-0 lg:max-w-[250px] ">
          Server Seed
        </div>
        <div className="flex h-full flex-1 flex-col items-center  border border-solid border-neutral-700  p-3 text-center md:flex-row lg:-ml-6  lg:pl-9">
          <span className="mx-3 break-all font-mono text-sm">
            {currentKey?.secretHash}
          </span>
          <div className="mt-3 flex space-x-3 md:ml-auto md:mt-0 items-center">
            <button
              onClick={toggleServerSeedHistory}
              type="button"
              className="flex h-10 items-center justify-center rounded-none border border-solid border-neutral-500 px-4 text-sm font-bold uppercase leading-none transition-colors duration-150 hover:bg-neutral-700"
            >
              Server Seed History
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:h-14 lg:flex-row">
        <div className="z-10 -mb-px flex h-full w-full items-center justify-center rounded-none bg-neutral py-2 text-center font-bold uppercase lg:py-1 lg:mb-0 lg:max-w-[250px] ">
          SECRET SALT
        </div>
        <div className="flex h-full flex-1 flex-col items-center  border border-solid border-neutral-700  p-3 text-center md:flex-row lg:-ml-6  lg:pl-9">
          <span className="mx-3 break-all font-mono text-sm">
            {currentKey?.secretSalt}
          </span>
        </div>
      </div>
      <div className="flex flex-col lg:h-14 lg:flex-row">
        <div className="z-10 -mb-px flex h-full w-full items-center justify-center rounded-none bg-neutral py-2 text-center font-bold uppercase lg:py-1 lg:mb-0 lg:max-w-[250px] ">
          PUBLIC HASH
        </div>
        <div className="flex h-full flex-1 flex-col items-center  border border-solid border-neutral-700  p-3 text-center md:flex-row lg:-ml-6  lg:pl-9">
          <span className="mx-3 break-all font-mono text-sm">
            {currentKey?.publicHash}
          </span>
        </div>
      </div>
      <div className="flex flex-col lg:h-14 lg:flex-row">
        <div className="z-10 -mb-px flex h-full w-full items-center justify-center rounded-none bg-neutral py-2 text-center font-bold uppercase lg:py-1 lg:mb-0 lg:max-w-[250px] ">
          ROUND
        </div>
        <div className="flex h-full flex-1 flex-col items-center  border border-solid border-neutral-700  p-3 text-center md:flex-row lg:-ml-6  lg:pl-9">
          <span className="mx-3 break-all font-mono text-sm">
            {currentKey?.round}
          </span>
        </div>
      </div>

      <div className="flex justify-end gap-2 p-3">
        <div className="text-white text-opacity-50 text-sm max-w-[300px]">
          To see the hidden data from the table you need to reveal the server
          seed
        </div>
        <Button
          className="btn-green !btn-md !rounded-none"
          onClick={showServerSeed}
          type="button"
          loading={showLoading}
        >
          show server seed
        </Button>
      </div>
      <Modal open={editSeedVisible} className="max-w-md">
        <Modal.Header className="uppercase font-semibold leading-tight">
          ENTER NEW CLIENT SEED
        </Modal.Header>
        <Button
          size="xs"
          shape="circle"
          color="ghost"
          className="absolute right-2 top-2"
          onClick={toggleEditSeed}
        >
          ✕
        </Button>
        <Modal.Body className="flex flex-col gap-4">
          <Input placeholder="Enter new client seed" ref={seedRef} />
        </Modal.Body>
        <Modal.Actions className="flex flex-col mt-4">
          <Button
            className="btn-green w-full rounded"
            onClick={onResetClientSeed}
            loading={resetLoading}
          >
            <FormattedMessage id="confirm" />
          </Button>
        </Modal.Actions>
      </Modal>
      {clientSeedHistoryVisible && (
        <ClientSeedHistory
          open={clientSeedHistoryVisible}
          onClose={toggleClientSeedHistory}
        />
      )}
      {serverSeedHistoryVisible && (
        <ServerSeedHistory
          open={serverSeedHistoryVisible}
          onClose={toggleServerSeedHistory}
        />
      )}
    </div>
  );
}
