import Banner from '../case/banner';
export default () => {
  return (
    <div className="w-full max-w-[1400px] m-auto relative min-h-[500px]">
      <Banner />
      <div className='flex max-w-3xl border border-purple py-[30px] mx-auto translate-y-[-50px] ' style={{background: 'var(--C3, radial-gradient(124.94% 91.38% at 49.87% 100%, #533476 0%, #1F1A33 100%))'}}>
        <div className='w-full flex flex-col items-center justify-center'>
          <div>FIRST DEPOSIT</div>
          <span>Enter the code “helloween” +20%</span>
          <button className="btn btn-purple">Refil</button>
        </div>
        <div className='w-full flex items-center justify-center'>
          <div>Free roll</div>
          <div>
            <span>12/279</span>
            <button className="btn btn-purple">JOIN THE GIVEAWAY</button>
          </div>
        </div>
      </div>
      <div className='text-xl font-bold text-center'>HALLOWEEN LIMITED TIMEEVENT</div>
    </div>
  );
};
