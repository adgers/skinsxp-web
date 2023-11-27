import { FormattedMessage, useModel } from '@umijs/max';

export default function GiftCase() {
  const { showEmail } = useModel('user');

  return (
    <>
      <div
        className="fixed bottom-40 md:bottom-[110px] z-[99] right-3 cursor-pointer flex flex-col items-center"
        onClick={() => {
          showEmail();
        }}
      >
        <img
          src={require('@/assets/home-gift.png')}
          alt=""
          className="w-[88px] md:w-[122px] object-cover shake"
        />
        <div
          className="absolute -bottom-5 rounded uppercase text-sm font-semibold text-black w-[100px] md:w-[140px] flex justify-center text-center py-2 md:py-3.5"
          style={{
            background:
              'var(--M1, linear-gradient(270deg, #0BFF59 0.04%, #B4FC3B 99.77%))',
          }}
        >
          <FormattedMessage id="home_lqlw" />
        </div>
      </div>
    </>
  );
}
