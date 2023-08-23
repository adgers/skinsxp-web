import WeaponCard from '@/components/weaponCard';
import { exchangeVoucherStockUsingPOST } from '@/services/front/duihuanquanshangchengxiangguan';
import { FormattedMessage, useIntl } from '@umijs/max';
import { useState } from 'react';

import { Button, Modal } from 'react-daisyui';
import { toast } from 'react-toastify';

const Exchange = ({
  show,
  item,
  onClose,
  onSuccess,
}: {
  show: boolean;
  item: any;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const intl = useIntl();
  const onSale = async () => {
    if (loading) {
      return false;
    }
    setLoading(true);
    const ret = await exchangeVoucherStockUsingPOST({
      stockId: item.id,
    });
    setLoading(false);
    if (ret.status === 0) {
      toast.success(intl.formatMessage({ id: 'exchange_success' }));
      onSuccess();
    }
  };

  return (
    <Modal open={show} className="max-w-fit rounded">
      <Modal.Header className="text-center mb-0 text-lg">
        <FormattedMessage id="exchange_detail" />
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
      <Modal.Body className="w-full justify-center flex mt-2">
        <div className="w-52">
          <WeaponCard data={item} />
        </div>
      </Modal.Body>
      <Modal.Actions className="flex justify-center">
        <Button className="btn-sm btn-outline rounded" onClick={onClose}>
          <FormattedMessage id="cancel" />
        </Button>
        <Button
          className="btn-primary btn-sm rounded"
          onClick={onSale}
          loading={loading}
        >
          <FormattedMessage id="confirm" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default Exchange;
