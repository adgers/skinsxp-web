import img404 from '@/assets/404.png';

export default function Page() {
  return (
    <div className="flex justify-center py-20">
      <img src={img404} alt="" className="w-[750px]" />
    </div>
  );
}
