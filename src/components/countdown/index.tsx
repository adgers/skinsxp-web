import number1 from '@/assets/num1.png';
import number2 from '@/assets/num2.png';
import number3 from '@/assets/num3.png';
import { useEffect, useState } from 'react';
import { Howl } from 'howler';

const Countdown = ({
  onFinish,
  voice,
}: {
  onFinish: () => void;
  voice: boolean;
}) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(interval);
      onFinish();
    }

    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    if (voice) {
      const audio = new Howl({
        src: [require('@/assets/audio/count.mp3')],
      })

      audio.play();
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[999] bg-black bg-opacity-30">
      {countdown === 3 && (
        <img
          src={number3}
          className="animate__animated animate__zoomIn w-[108px] h-[108px] sm:w-[160px] sm:h-[160px]"
        />
      )}
      {countdown === 2 && (
        <img
          src={number2}
          className="animate__animated animate__zoomIn w-[108px] h-[108px] sm:w-[160px] sm:h-[160px]"
        />
      )}
      {countdown === 1 && (
        <img
          src={number1}
          className="animate__animated animate__zoomIn w-[108px] h-[108px] sm:w-[160px] sm:h-[160px]"
        />
      )}
    </div>
  );
};

export default Countdown;
