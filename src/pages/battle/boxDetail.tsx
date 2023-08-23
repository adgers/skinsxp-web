import WeaponCard from '@/components/weaponCard';
import { getBoxColor, numberFixed } from '@/utils';
import { FormattedMessage } from '@umijs/max';
import { Button, Modal } from 'react-daisyui';

export default function BoxDetail({
  boxInfo,
  show,
  onClose,
}: {
  boxInfo?: API.BoxGiftInfoVo & { boxName: string };
  show: boolean;
  onClose: () => void;
}) {
  return (
    <Modal open={show} className="max-w-6xl">
      <Modal.Header className="mb-2 text-center text-lg">
        {boxInfo?.boxName} <FormattedMessage id="include_gifts" />：
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
      <Modal.Body className="overflow-y-scroll max-h-[600px] sm:overflow-y-auto sm:max-h-full">
        {boxInfo?.gradeGiftProb && (
          <div className="flex items-center justify-center gap-2 flex-wrap mb-4 font-num">
            <span className="text-sm uppercase font-semibold">
              <FormattedMessage id="drop_probability" />
            </span>
            {boxInfo?.gradeGiftProb?.map((item, i: number) => {
              const color = getBoxColor(item.grade || 0);
              return (
                <div className="flex items-center gap-2" key={i}>
                  <div
                    className="w-6 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                  <div className={`text-white text-sm text-[${color}]`}>
                    {item?.prob && numberFixed(item?.prob * 100)}%
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {boxInfo?.boxGiftVo?.map((item, i: number) => {
            return <WeaponCard data={item} key={i} />;
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
}
