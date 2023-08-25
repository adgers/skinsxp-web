import { IconFont } from '@/components/icons';
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
    <Modal open={show} className="max-w-4xl">
      <Modal.Header className="mb-2 text-center">
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
      <Modal.Body className="max-h-[calc(100vh-64px)] overflow-y-scroll sm:overflow-y-auto">
        {boxOpenRecords?.map((record, i) => (
          <div className="w-full" key={i}>
            <div className="flex w-full gap-2 items-center px-3 py-3">
              <img src={record?.headPic} className="w-8 h-8 rounded" />
              <div className="flex flex-col text-xs">
                <span>{record.nickname} </span>
                <div>
                  {record.winner ? (
                    <span className="text-green">
                      <FormattedMessage id="success" />
                    </span>
                  ) : (
                    <span className="text-red">
                      <FormattedMessage id="failed" />
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto p-3 bg-dark rounded-md">
              {record?.userOpenBoxRecord?.map((urecord, i) => (
                <div
                  className="flex flex-col items-center flex-shrink-0 w-40 gap-1"
                  key={i}
                >
                  <div className="mb-2 mt-1 text-center text-xs font-bold uppercase">
                    ROUND {urecord.round}
                  </div>
                  <WeaponCard key={i} data={urecord} />
                  <div className="mt-2 flex gap-1 text-xs font-bold uppercase">
                    <span>Roll ID {urecord.rollCode}</span>
                    <Link to={`/profile/provably-fair/verify/${urecord.verifyId}`}>
                      <IconFont type="icon-shield" className="text-green" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
}
