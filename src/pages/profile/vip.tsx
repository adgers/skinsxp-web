import { IconFont } from '@/components/icons';
import { listUsingGET } from '@/services/front/yonghufulipeizhi';
import { useRequest } from '@umijs/max';

export default function VipPage() {
  const { data, loading } = useRequest(() => listUsingGET());

  return (
    <div className="w-full flex justify-center">
      {!loading && data && (
        <div className="flex rounded overflow-hidden ring-1 ring-accent">
          <div
            className="flex flex-col text-sm"
            style={{
              background: 'linear-gradient(90deg, #44425E 0%, #131314 100%)',
            }}
          >
            <div className="vip-item">Level</div>
            <div className="vip-item">total</div>
            <div className="vip-item">money</div>
            <div className="vip-item">roll</div>
            <div className="vip-item">increase</div>
            <div className="vip-item">voucher</div>
            <div className="vip-item">cdkey</div>
            <div className="vip-item">avatar</div>
            <div className="vip-item">receive</div>
          </div>
          <div className="flex flex-row flex-1 overflow-x-auto relative overflow-hidden">
            <div className="absolute right-4 w-[1100px] left-4 h-[63px] top-16 bg-base-100 flex flex-col justify-center gap-2">
              <div className="text-xs text-secondary">
                {data?.customerExp}
                <span className="mx-1">/</span>
                {data?.maxExp}
              </div>
              <progress
                className="progress progress-secondary-l ring-1 ring-secondary bg-base-100 w-full"
                value={data?.customerExp}
                max={data?.maxExp}
              ></progress>
            </div>
            {data?.customerBounsVos?.map((item,i) => (
              <div className="flex flex-col text-sm flex-shrink-0 border-l border-neutral-700" key={i}>
                <div className="vip-item border-b border-neutral-700">
                  <div className="vip-level">
                    <div className="vip-level-icon"></div>
                    <div className="vip-level-num">{item.grade}</div>
                  </div>
                </div>
                <div className="vip-item border-b border-neutral-700"></div>
                <div className="vip-item border-b border-neutral-700 font-num">
                  <IconFont type="icon-coin" className="mr-1 text-primary" />{' '}
                  {item.expMin}
                </div>
                <div className="vip-item border-b border-neutral-700">
                  {item.rollInfo}
                </div>
                <div className="vip-item border-b border-neutral-700 font-num">
                  +{item.rechargeDiscount}%
                </div>
                <div className="vip-item border-b border-neutral-700">
                  {item.couponInfo}
                </div>
                <div className="vip-item border-b border-neutral-700 font-num">
                  <IconFont type="icon-coin" className="mr-1 text-primary" />
                  {item.cdkInfo}
                </div>
                <div className="vip-item border-b border-neutral-700">
                  <img src={item.headGround} width={50} />
                </div>
                <div className="vip-item">
                  <button className="btn btn-xs btn-secondary btn-outline rounded" type='button'>
                    领取
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
