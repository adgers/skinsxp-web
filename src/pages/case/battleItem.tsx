interface BattleItemProps {
  index: number;
  data: API.BattleVo;
}
export default function BattleItem(props: BattleItemProps) {
  const { data } = props;
  return (
    <div
      className={`relative z-10 flex items-start flex-col h-[206px]  min-w-[90%] snap-start overflow-hidden sm:min-w-[50%] md:min-w-[33.333333%] xl:min-w-[20%] justify-between battle-item battle-item-grade-${data?.mode}`}
    >
      <div>
        <div
          className={`rounded-full text-white flex items-center mt-2.5 ml-4 flex-shrink-0 justify-center font-bold w-[34px] h-[34px] border-[2px] border-opacity-40 ${
            data?.round === 0 ? 'border-green ' : 'border-red'
          }`}
        >{data?.countCustomer}</div>
        Round
      </div>

      <div className="relative z-10 flex-1 overflow-hidden flex flex-col items-start justify-between pb-2 pl-3 pr-2 h-full w-full">
        <div className="h-full w-full flex-1 overflow-hidden bg-[] bg-no-repeat bg-opacity-[0.3]  bg-center relative">
          <img
            src="https://dew3d5d3mc6te.cloudfront.net/cases/tU9osDA67C6myUAHgpPcDDNLXYC6peJFXd13VE76.png"
            className=" h-full  m-auto z-[11]"
            alt=""
          />
          <img
            src={require('@/assets/iv.png')}
            className="absolute z-1 top-[50%] left-[50%] opacity-30  translate-x-[-50%] translate-y-[-50%]"
            alt=""
          />
        </div>
        <div className="">123</div>
      </div>
      <div
        className="relative z-10 w-full flex items-center justify-between overflow-hidden rounded-none px-2 py-2.5"
        style={{
          background: 'rgba(23, 23, 23, 0.60)',
          backdropFilter: 'blur(1px)',
        }}
      >
        <div className="absolute left-8 right-8 top-0 z-10 h-px transition-colors duration-300 css-9xv0pe"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center p-1">
          <div className="h-full w-full overflow-hidden rounded-lg"></div>
        </div>
        <div className="relative z-10 flex flex-col">
          <span className="text-[8px] font-semibold uppercase text-white/60 scale-90">
            battle Cost
          </span>
          <span className="text-white">${data?.totalPrice}</span>
        </div>
      </div>
    </div>
  );
}
