import emptyImg from '@/assets/empty.png';

export default function Empty() {
  return (
    <div className="flex justify-center py-20">
      <div className="flex flex-col items-center justify-center">
        <img src={emptyImg} alt="" className="w-52" />
        <h2 className="mt-4 font-bold uppercase text-sm">no data</h2>
      </div>
    </div>
  );
}
