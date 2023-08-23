import '@dotlottie/player-component';
import loadingData from '@/assets/loading.lottie'

export default function LotterLoading() {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <dotlottie-player
        src={loadingData}
        autoplay
        loop
        style={{ height: '200px', width: '200px' }}
      />
    </div>
  );
}