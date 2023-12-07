import { cloudflareTokenUsingPOST } from '@/services/front/zhandianweidushuju';
import { Turnstile } from '@marsidev/react-turnstile';
import { getLocale, history } from '@umijs/max';

export default function TestBot() {
  const locale = getLocale();

  const handleSendToken = async (token: string) => {
    const ret = await cloudflareTokenUsingPOST({
      'cf-turnstile-response': token,
    });
    if (ret?.status === 0) {
      history.push('/');
    }
  };

  return (
    <div className="w-full h-full">
      <Turnstile
        siteKey="0x4AAAAAAAN4Ou8ut65lzmuz"
        onError={() => {
          console.warn('you===bot');
        }}
        onSuccess={(token: string) => {
          handleSendToken(token);
        }}
        options={{
          theme: 'light',
          language: locale,
          retryInterval: 8000,
        }}
        className="ml-[200px]"
      />
    </div>
  );
}
