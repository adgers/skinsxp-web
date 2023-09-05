import {
  resetUsingPOST,
  verifyUsingGET1,
} from '@/services/front/miyaozhongzixiangguan';
import { useParams } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-daisyui';
import { toast } from 'react-toastify';

export default function ProvablyVerify() {
  const id = useParams<{ id: string }>().id;

  const inputRef = useRef<HTMLInputElement>(null);
  const [currentKey, setCurrentKey] = useState<API.RandKeyVo>();
  const [loading, setLoading] = useState(false);
  const onVerify = async () => {
    const verifyId = inputRef.current?.value;
    if (!verifyId) {
      toast.error('Please input verify id');
      return;
    }

    setLoading(true);
    const ret = await verifyUsingGET1({ verifyId: Number(verifyId) });
    setLoading(false);
    if (ret.status === 0) {
      setCurrentKey(ret.data);
    }
  };

  const onShowServerSeed = async () => {
    const ret = await resetUsingPOST({});
    if (ret.status === 0) {
      toast.success('Show server seed successfully');
      setCurrentKey((prev) => {
        return {
          ...prev,
          ...ret.data,
        };
      });
    }
  };

  useEffect(() => {
    if (id) {
      inputRef.current!.value = id;
      onVerify();
    }
  }, []);

  return (
    <div className="my-4">
      <div className="flex pb-5 join max-w-4xl">
        <label className="join-item flex w-full max-w-sm cursor-text items-center rounded-none border border-solid border-neutral-500 pl-5 text-sm">
          <input
            type="text"
            className="flex-1 border-none bg-transparent text-sm text-white focus:outline-none"
            placeholder="ENTER VERIFY ID"
            ref={inputRef}
          />
        </label>
        <Button
          className="join-item btn btn-primary btn-outline uppercase rounded-none border border-green text-white"
          onClick={onVerify}
          loading={loading}
        >
          Verification
        </Button>
      </div>
      {currentKey && (
        <div className="gap-4 space-y-4 lg:grid lg:grid-cols-12 lg:space-y-0 text-white">
          <div className="flex flex-col space-y-4 lg:col-span-8">
            <div className="flex flex-col lg:h-14 lg:flex-row">
              <div className="z-10 -mb-px  flex h-full w-full items-center justify-center rounded-none bg-neutral py-2 text-center font-bold uppercase lg:py-1 lg:mb-0 lg:max-w-[250px] ">
                Client Seed
              </div>
              <div className="flex h-full flex-1 flex-col items-center border border-solid border-neutral-700 p-3 text-center md:flex-row lg:-ml-6  lg:pl-9">
                <span className="mx-3 break-all font-mono text-sm">
                  {currentKey.clientSeed}
                </span>
              </div>
            </div>
            <div className="flex flex-col lg:h-14 lg:flex-row">
              <div className="z-10 -mb-px flex h-full w-full items-center justify-center rounded-t bg-neutral py-2 text-center font-bold uppercase lg:py-1 lg:mb-0 lg:max-w-[250px] ">
                Server Seed
              </div>

              <div className="flex h-full flex-1 flex-col items-center border border-solid border-neutral-700 p-3 text-center md:flex-row lg:-ml-6  lg:pl-9">
                <span className="mx-3 break-all font-mono text-sm">
                  {currentKey.secretHash}
                </span>
                {/* {!currentKey.isPublic && (
                  <div className="mt-3 md:ml-auto md:mt-0">
                    <button
                      className="flex h-10 items-center rounded-none justify-center border border-solid border-light px-8 text-sm font-bold uppercase leading-none transition-colors duration-150 hover:bg-neutral"
                      onClick={onShowServerSeed}
                      type='button'
                    >
                      show server seed
                    </button>
                  </div>
                )} */}
              </div>
            </div>
            <div className="flex flex-col lg:h-14 lg:flex-row">
              <div className="z-10 -mb-px flex h-full w-full items-center justify-center rounded-t bg-neutral py-2 text-center font-bold uppercase lg:py-1 lg:mb-0 lg:max-w-[250px] ">
                SECRET SALT
              </div>
              <div className="flex h-full flex-1 flex-col items-center border border-solid border-neutral-700 p-3 text-center md:flex-row lg:-ml-6  lg:pl-9">
                <span className="mx-3 break-all font-mono text-sm">
                  {currentKey.secretSalt}
                </span>
              </div>
            </div>
            <div className="flex flex-col lg:h-14 lg:flex-row">
              <div className="z-10 -mb-px flex h-full w-full items-center justify-center rounded-t bg-neutral py-2 text-center font-bold uppercase lg:py-1 lg:mb-0 lg:max-w-[250px] ">
                PUBLIC HASH
              </div>
              <div className="flex h-full flex-1 flex-col items-center border border-solid border-neutral-700 p-3 text-center md:flex-row lg:-ml-6  lg:pl-9">
                <span className="mx-3 break-all font-mono text-sm">
                  {currentKey.publicHash}
                </span>
              </div>
            </div>
            <div className="flex flex-col lg:h-14 lg:flex-row">
              <div className="z-10 -mb-px flex h-full w-full items-center justify-center rounded-t bg-neutral py-2 text-center font-bold uppercase lg:py-1 lg:mb-0 lg:max-w-[250px] ">
                ROUND
              </div>
              <div className="flex h-full flex-1 flex-col items-center border border-solid border-neutral-700 p-3 text-center md:flex-row lg:-ml-6  lg:pl-9">
                <span className="mx-3 break-all font-mono text-sm">
                  {currentKey.round}
                </span>
              </div>
            </div>
            <div className="flex flex-col lg:h-14 lg:flex-row">
              <div className="z-10 -mb-px flex h-full w-full items-center justify-center rounded-t bg-neutral py-2 text-center font-bold uppercase lg:py-1 lg:mb-0 lg:max-w-[250px] ">
                ROLLED AT
              </div>
              <div className="flex h-full flex-1 flex-col items-center border border-solid border-neutral-700 p-3 text-center md:flex-row lg:-ml-6  lg:pl-9">
                <span className="mx-3 break-all font-mono text-sm">
                  {currentKey.createTime}
                </span>
              </div>
            </div>
            <div className="flex flex-col lg:h-14 lg:flex-row">
              <div className="z-10 -mb-px flex h-full w-full items-center justify-center rounded-t bg-neutral py-2 text-center font-bold uppercase lg:py-1 lg:mb-0 lg:max-w-[250px] ">
                ROLL
              </div>
              <div className="flex h-full flex-1 flex-col items-center border border-solid border-neutral-700 p-3 text-center md:flex-row lg:-ml-6  lg:pl-9">
                <span className="mx-3 break-all font-mono text-sm">
                  {currentKey.rollCode}
                </span>
              </div>
            </div>
          </div>
          <div className="self-start lg:col-span-4">
            <div className="relative flex flex-col overflow-hidden rounded-none border border-solid border-light bg-neutral p-1 text-xs">
              <pre className="h-full w-full overflow-auto p-5 pt-8">
                {JSON.stringify(
                  {
                    server_seed: currentKey.secretHash,
                    secret_salt: currentKey.secretSalt,
                    public_hash: currentKey.publicHash,
                    client_seed: currentKey.clientSeed,
                    round: currentKey.round,
                    roll: currentKey.rollCode,
                    date: currentKey.createTime,
                  },
                  null,
                  2,
                )}
              </pre>
              <div className="absolute left-0 top-0 mr-auto rounded-br-lg bg-neutral-600 px-3 py-2 text-2xs font-bold leading-tight text-neutral-300">
                JSON
              </div>
            </div>

            <div
              className="link text-sm mt-2 text-white text-right"
              onClick={() => {
                window.open(
                  'https://codesandbox.io/embed/cranky-sun-ls9nmx?fontsize=14&hidenavigation=1&theme=dark',
                );
              }}
            >
              Verify roll generation
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
