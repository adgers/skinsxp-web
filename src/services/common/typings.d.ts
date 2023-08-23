declare namespace API {
  type Banner = {
    createTime?: string;
    delFlag?: boolean;
    id?: number;
    image?: string;
    modifyTime?: string;
    remark?: string;
    title?: string;
    url?: string;
    visible?: boolean;
    weight?: number;
  };

  type BoxPageVo = {
    appId?: string;
    boxImage?: string;
    boxName?: string;
    boxThemeId?: number;
    boxType?: number;
    createTime?: string;
    delFlag?: boolean;
    discount?: number;
    id?: number;
    modifyTime?: string;
    moduleId?: number;
    moduleName?: string;
    openPrice?: number;
    remark?: string;
    secondVideo?: string;
    video?: string;
    visible?: boolean;
    visibleRoom?: boolean;
    weaponImage?: string;
    weight?: number;
  };

  type BoxThemeListVo = {
    boxList?: BoxPageVo[];
    boxType?: number;
    createTime?: string;
    delFlag?: boolean;
    id?: number;
    modifyTime?: string;
    moduleId?: number;
    remark?: string;
    themeName?: string;
    weight?: number;
  };

  type CaptchaVo = {
    captchaKey?: string;
    image?: string;
  };

  type Document = {
    content?: string;
    createTime?: string;
    delFlag?: boolean;
    documentType?: number;
    id?: number;
    image?: string;
    modifyTime?: string;
    remark?: string;
    title?: string;
    visible?: boolean;
    weight?: number;
  };

  type documentPageUsingGETParams = {
    /** documentType */
    documentType?: number;
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
  };

  type getBoxThemeListUsingGETParams = {
    /** boxType */
    boxType?: number;
    /** moduleId */
    moduleId?: number;
  };

  type getDashBoardUrlUsingGETParams = {
    /** dashboard */
    dashboard: number;
  };

  type getRecentOpenBoxUsingGETParams = {
    /** grade */
    grade?: number;
    /** limit */
    limit?: number;
  };

  type mailCodeUsingGETParams = {
    /** captchaKey */
    captchaKey: string;
    /** captchaValue */
    captchaValue: string;
    /** mail */
    mail: string;
  };

  type Module = {
    appid?: string;
    createTime?: string;
    delFlag?: boolean;
    id?: number;
    modifyTime?: string;
    moduleName?: string;
    remark?: string;
  };

  type Notice = {
    content?: string;
    createTime?: string;
    delFlag?: boolean;
    id?: number;
    modifyTime?: string;
    remark?: string;
    title?: string;
    url?: string;
  };

  type PageInfoDocument_ = {
    page?: number;
    pageData?: Document[];
    pageSize?: number;
    totalPages?: number;
    totalRows?: number;
  };

  type RecentOpenBoxGiftVo = {
    boxId?: number;
    boxImage?: string;
    boxName?: string;
    customerId?: number;
    giftImage?: string;
    giftTemplateId?: string;
    grade?: number;
    headGround?: string;
    headPic?: string;
    id?: number;
    nickname?: string;
    voucherName?: string;
  };

  type ResultDataBoolean_ = {
    data?: boolean;
    msg?: string;
    status?: number;
  };

  type ResultDataCaptchaVo_ = {
    data?: CaptchaVo;
    msg?: string;
    status?: number;
  };

  type ResultDataList_ = {
    data?: Record<string, any>[];
    msg?: string;
    status?: number;
  };

  type ResultDataListBanner_ = {
    data?: Banner[];
    msg?: string;
    status?: number;
  };

  type ResultDataListBoxThemeListVo_ = {
    data?: BoxThemeListVo[];
    msg?: string;
    status?: number;
  };

  type ResultDataListMapStringObject_ = {
    data?: Record<string, any>[];
    msg?: string;
    status?: number;
  };

  type ResultDataListModule_ = {
    data?: Module[];
    msg?: string;
    status?: number;
  };

  type ResultDataListNotice_ = {
    data?: Notice[];
    msg?: string;
    status?: number;
  };

  type ResultDataListRecentOpenBoxGiftVo_ = {
    data?: RecentOpenBoxGiftVo[];
    msg?: string;
    status?: number;
  };

  type ResultDataListString_ = {
    data?: string[];
    msg?: string;
    status?: number;
  };

  type ResultDataPageInfoDocument_ = {
    data?: PageInfoDocument_;
    msg?: string;
    status?: number;
  };

  type ResultDataString_ = {
    data?: string;
    msg?: string;
    status?: number;
  };

  type smsCodeUsingGET1Params = {
    /** captchaVerification */
    captchaVerification: string;
    /** phone */
    phone: string;
  };

  type smsCodeUsingPOSTParams = {
    captchaVerification?: string;
    csessionid?: string;
    ip?: string;
    phone?: string;
    sig?: string;
    token?: string;
  };

  type sysNoticeUsingGETParams = {
    /** topN */
    topN?: number;
  };

  type userSmsCodeUsingGETParams = {
    /** captchaVerification */
    captchaVerification: string;
  };

  type userSmsCodeUsingPOSTParams = {
    captchaVerification?: string;
    csessionid?: string;
    ip?: string;
    phone?: string;
    sig?: string;
    token?: string;
  };

  type viewImageNewUsingGETParams = {
    /** serialNo */
    serialNo: string;
  };

  type viewImageUsingGETParams = {
    /** serialNo */
    serialNo: string;
  };
}
