import { useEffect } from 'react';

const loadNcJs = () => {
  return new Promise((resolve, reject) => {
    if (window.hasOwnProperty('noCaptcha')) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://g.alicdn.com/sd/ncpc/nc.js?t=2015052012';
    script.onerror = reject;
    script.onload = function () {
      resolve(true);
    };
    document.head.appendChild(script);
    return;
  });
};

export default function NCCheck({
  onSuccess,
  id,
}: {
  onSuccess: (data: any) => void;
  id: string;
}) {
  useEffect(() => {
    loadNcJs().then(() => {
      const nc_token = [
        'FFFF0N0000000000B2CC',
        new Date().getTime(),
        Math.random(),
      ].join(':');
      const NC_Opt = {
        renderTo: `#ncCheck`,
        appkey: 'FFFF0N0000000000B2CC',
        scene: 'nc_message',
        token: nc_token,
        customWidth: 250,
        trans: { key1: 'code0' },
        elementID: ['usernameID'],
        is_Opt: 0,
        language: 'cn',
        isEnabled: true,
        timeout: 3000,
        times: 5,
        apimap: {},
        callback: function (data: any) {
          onSuccess(data);
        },
      };
      //@ts-ignore
      if (window.noCaptcha) {
        //@ts-ignore
        window[`_nc_check`] = new window.noCaptcha(NC_Opt);
      }
    });

  }, [id]);

  return <div id="ncCheck" className="nc-container"></div>;
}
