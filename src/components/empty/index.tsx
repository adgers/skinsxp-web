import emptyImg from '@/assets/empty.png';
import { FormattedMessage } from '@umijs/max';

export default function Empty() {
  return (
    <div className="flex justify-center py-20">
      <div className="flex flex-col items-center justify-center">
        <img src={emptyImg} alt="" className="w-52" />
        <h2 className="mt-4 font-semibold text-sm">
          <FormattedMessage id="empty_page_main_txt" />
        </h2>
      </div>
    </div>
  );
}
