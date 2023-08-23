import { getLocalSettings, isMobile, saveLocalSettings } from '@/utils';
import { useState } from 'react';

export default () => {
  const localFast = getLocalSettings('fast');
  const localVoice = getLocalSettings('voice');

  const [fast, setFast] = useState<boolean>(
    localFast === undefined ? false : localFast,
  );

  const [voice, setVoice] = useState<boolean>(
    localVoice === undefined ? !isMobile() : localVoice,
  );

  const toggleVoice = () => {
    saveLocalSettings('voice', !voice);
    setVoice(!voice);
  };
  const toggleFast = () => {
    saveLocalSettings('fast', !fast);
    setFast(!fast);
  };
  return {
    fast,
    toggleFast,
    voice,
    toggleVoice,
  };
};
