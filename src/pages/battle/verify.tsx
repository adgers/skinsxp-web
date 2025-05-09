import WeaponCard from '@/components/weaponCard';
import { FormattedMessage, Link } from '@umijs/max';
import { Button, Modal } from 'react-daisyui';

export default function Verify({
  show,
  onClose,
  data,
}: {
  show: boolean;
  onClose: () => void;
  data: API.BattleResultVo;
}) {
  const { boxOpenRecords } = data;

  return (
    <Modal open={show} className="max-w-4xl w-full sm:w-auto sm:min-w-[500px]">
      <Modal.Header className="mb-2 text-center uppercase font-semibold">
        <FormattedMessage id="battle_fairness_verify" />
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
      <Modal.Body className="max-h-[calc(100vh-64px)] overflow-y-scroll sm:overflow-y-auto hide-scrollbar">
        {boxOpenRecords?.map((record, i) => (
          <div className="w-full" key={i}>
            <div className="flex w-full gap-2 items-center px-3 py-3 bg-black rounded">
              <img src={record?.headPic} className="w-8 h-8 rounded" />
              <div className="flex flex-col text-xs">
                <div>
                  {record.nickname}{' '}
                  {record.winner && (
                    <span className="text-green uppercase">
                      <FormattedMessage id="room_giveaways_winner" />
                    </span>
                  )}
                </div>
                <div className="flex text-xs gap-2">
                  <span className="uppercase">
                    <FormattedMessage id="battle_user_seed" />
                  </span>
                  <div className="text-white text-opacity-50">
                    {record?.clientSeed}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto py-2 bg-dark rounded-md">
              {record?.userOpenBoxRecord?.map((urecord, i) => (
                <div
                  className="flex flex-col items-center flex-shrink-0 w-40 gap-1 bg-black/40 p-2 rounded"
                  key={i}
                >
                  <div className="mb-2 mt-1 text-center text-xs font-semibold uppercase">
                    {urecord.round} ROUND
                  </div>
                  <WeaponCard key={i} data={urecord} showRoll={false} />
                  <Link
                    to={`/provably-fair/verify/${urecord.verifyId}`}
                    className="mt-2 flex gap-1 text-xs uppercase font-semibold"
                  >
                    <span>verify</span>
                    <FormattedMessage id="battle_roll_id" />{urecord.rollCode}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
}
