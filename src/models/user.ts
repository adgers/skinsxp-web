import { customerDetailUsingGET } from '@/services/front/gerenzhongxinxiangguan';
import { getLocalSettings, isLogin, saveLocalSettings } from '@/utils';
import { useEffect, useState } from 'react';

export default () => {
  const [loginShow, setLoginShow] = useState<boolean>(false);
  const [smsLoginShow, setSmsLoginShow] = useState<boolean>(false);
  const [registerShow, setRegisterShow] = useState<boolean>(false);
  const [findPwdShow, setFindPwdShow] = useState<boolean>(false);
  const [benefitShow, setBenefitShow] = useState<boolean>(false);
  const [steamLoginShow, setSteamLoginShow] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<API.CustomerDetailVo>();
  const localAgreePing = getLocalSettings('agreePing');
  const [loginTipShow, setLoginTipShow] = useState<boolean>(false);
  const [regTipShow, setRegTipShow] = useState<boolean>(false);
  const [langShow, setLangShow] = useState<boolean>(false);
  const [regNum, setRegNum] = useState(0);

  const [agreePing, setAgreePing] = useState<boolean>(
    localAgreePing === undefined ? true : localAgreePing,
  );

  const toggleAgreePing = () => {
    setAgreePing(!agreePing);
    saveLocalSettings('agreePing', !agreePing);
  };

  const hideLogin = () => {
    setLoginShow(false);
  };
  const showLogin = () => {
    setRegisterShow(false);
    setFindPwdShow(false);
    setSmsLoginShow(false);
    setLoginShow(true);
  };

  const hideSmsLogin = () => {
    setSmsLoginShow(false);
  };

  const showSmsLogin = () => {
    setRegisterShow(false);
    setFindPwdShow(false);
    setLoginShow(false);
    setSmsLoginShow(true);
  };

  const hideRegister = () => {
    setRegisterShow(false);
  };
  const showRegister = () => {
    setLoginShow(false);
    setSmsLoginShow(false);
    setRegisterShow(true);
  };

  const showFindPwd = () => {
    hideLogin();
    setFindPwdShow(true);
  };

  const hideFindPwd = () => {
    setFindPwdShow(false);
  };

  const showBenefit = () => {
    setBenefitShow(true);
  };

  const hideBenefit = () => {
    setBenefitShow(false);
  };

  const showSteamLogin = () => {
    setSteamLoginShow(true);
  };
  const hideSteamLogin = () => {
    setSteamLoginShow(false);
  };

  const showLoginTip = () => {
    setLoginTipShow(true);
  };
  const hideLoginTip = () => {
    setLoginTipShow(false);
  };

  const showRegTip = () => {
    setRegTipShow(true);
  };
  const hideRegTip = () => {
    setRegTipShow(false);
  };

  const showLang = () => {
    setLangShow(true);
  };
  const hideLang = () => {
    setLangShow(false);
  };

  const getUser = async () => {
    const ret = await customerDetailUsingGET();
    if (ret.data) {
      setUserInfo(ret.data);
    }
  };

  useEffect(() => {
    if (isLogin()) {
      getUser();
    }
  }, []);

  return {
    loginShow,
    showLogin,
    hideLogin,
    registerShow,
    showRegister,
    hideRegister,
    findPwdShow,
    showFindPwd,
    hideFindPwd,
    smsLoginShow,
    showSmsLogin,
    hideSmsLogin,
    benefitShow,
    showBenefit,
    hideBenefit,
    steamLoginShow,
    showSteamLogin,
    hideSteamLogin,
    userInfo,
    getUser,
    agreePing,
    toggleAgreePing,
    loginTipShow,
    showLoginTip,
    hideLoginTip,
    showRegTip,
    hideRegTip,
    regTipShow,
    langShow,
    showLang,
    hideLang,
    regNum,
    setRegNum,
  };
};
