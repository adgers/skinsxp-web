declare namespace API {
  type ActivityInfoVo = {
    activityProgress?: ActivityProgressVo[];
    currentActivity?: number;
    totalActivity?: number;
  };

  type ActivityProgressVo = {
    activityName?: string;
    complete?: boolean;
    createTime?: string;
    delFlag?: boolean;
    id?: number;
    modifyTime?: string;
    prizes?: PrizeVo[];
    remark?: string;
    reward?: boolean;
    rewardId?: number;
    rewardImage?: string;
    rewardName?: string;
    threshold?: number;
  };

  type ActivityRewardResultVo = {
    activityName?: string;
    createTime?: string;
    delFlag?: boolean;
    id?: number;
    modifyTime?: string;
    remark?: string;
    rewardId?: number;
    rewardImage?: string;
    rewardName?: string;
    threshold?: number;
  };

  type activityRewardUsingPOSTParams = {
    /** activityId */
    activityId: number;
  };

  type adaPayCallbackUsingPOSTParams = {
    /** adaPayCallback */
    adaPayCallback: Record<string, any>;
  };

  type AmountInfoVo = {
    amount?: number;
    quantity?: number;
  };

  type AuthLoginVo = {
    register?: boolean;
    result?: number;
    token?: string;
  };

  type BattleBoxGainVo = {
    battleId?: number;
    boxId?: number;
    boxName?: string;
    customerId?: number;
    giftGrade?: number;
    giftId?: number;
    giftImage?: string;
    giftName?: string;
    giftPrice?: number;
    id?: number;
    sort?: number;
    voucherId?: number;
  };

  type BattleBoxRecordVo = {
    battleId?: number;
    boxId?: number;
    boxName?: string;
    customerId?: number;
    giftGrade?: number;
    giftId?: number;
    giftImage?: string;
    giftName?: string;
    giftPrice?: number;
    id?: number;
    publicHash?: string;
    rollCode?: number;
    round?: number;
    sort?: number;
    verifyId?: number;
    voucherId?: number;
  };

  type BattleCustomerGainVo = {
    customerId?: number;
    headGround?: string;
    headPic?: string;
    nickname?: string;
    totalPrice?: number;
    userOpenBoxRecord?: BattleBoxGainVo[];
    winner?: boolean;
  };

  type BattleCustomerOpenBoxVo = {
    clientSeed?: string;
    customerId?: number;
    headPic?: string;
    nickname?: string;
    totalPrice?: number;
    userOpenBoxRecord?: BattleBoxRecordVo[];
    winner?: boolean;
  };

  type BattleDetailVo = {
    battleCode?: string;
    boxList?: Record<string, any>[];
    countCustomer?: number;
    customerId?: number;
    customerList?: Record<string, any>[];
    id?: number;
    mode?: number;
    state?: number;
    title?: string;
    totalPrice?: number;
  };

  type BattleRankPageVo = {
    myReward?: BattleRankVo;
    todayRank?: BattleRankVo[];
    topOneYesterday?: BattleRankVo;
    yesterdayRank?: BattleRankVo[];
  };

  type BattleRankVo = {
    bizDate?: number;
    customerId?: number;
    headGround?: string;
    headPic?: string;
    nickname?: string;
    rewardPoint?: number;
  };

  type BattleResultVo = {
    boxOpenRecords?: BattleCustomerOpenBoxVo[];
    createDate?: string;
    customerGainList?: BattleCustomerGainVo[];
    info?: BattleVo;
    randKeyVo?: RandKeyVo;
  };

  type BattleVo = {
    battleCode?: string;
    battleTime?: string;
    boxList?: Record<string, any>[];
    countCustomer?: number;
    customerList?: Record<string, any>[];
    id?: number;
    mode?: number;
    round?: number;
    state?: number;
    title?: string;
    totalPrice?: number;
    winnerGain?: number;
    winnerIds?: string;
    winners?: WinnerInfo[];
  };

  type bindInviterUsingPOSTParams = {
    /** invitationCode */
    invitationCode: string;
  };

  type bindSecurityWayUsingPOSTParams = {
    id?: string;
    /** oneTimeSecurityCode */
    oneTimeSecurityCode: string;
    type?: number;
    verifyCode?: string;
  };

  type boxDetailUsingGETParams = {
    /** caseId */
    caseId: number;
  };

  type BoxDetailVo = {
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
    openPrice?: number;
    remark?: string;
    secondVideo?: string;
    video?: string;
    visible?: boolean;
    visibleRoom?: boolean;
    weaponImage?: string;
    weight?: number;
  };

  type BoxGiftInfoVo = {
    boxGiftVo?: BoxGiftVo[];
    gradeGiftProb?: GradeGiftProb[];
  };

  type boxGiftListUsingGETParams = {
    /** caseId */
    caseId: number;
  };

  type BoxGiftListVo = {
    boxId?: number;
    createTime?: string;
    delFlag?: boolean;
    giftImage?: string;
    giftName?: string;
    giftTemplateId?: number;
    grade?: number;
    id?: number;
    modifyTime?: string;
    realProbability?: number;
    recoveryPrice?: number;
    remark?: string;
  };

  type BoxGiftVo = {
    appid?: string;
    boxId?: number;
    boxName?: string;
    giftId?: number;
    giftImage?: string;
    giftName?: string;
    grade?: number;
    realProbability?: number;
    recoveryPrice?: number;
    rollCodeHigh?: number;
    rollCodeLow?: number;
  };

  type boxPageUsingGETParams = {
    /** boxType */
    boxType?: number;
    /** moduleId */
    moduleId?: number;
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
    /** visibleRoom */
    visibleRoom?: boolean;
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

  type calculateAmountUsingGETParams = {
    /** quantity */
    quantity: number;
  };

  type calculateQuantityUsingGETParams = {
    /** amount */
    amount: number;
  };

  type cancelBattleUsingPOSTParams = {
    /** battleCode */
    battleCode: string;
  };

  type changeMailUsingPOSTParams = {
    /** newMail */
    newMail: string;
    /** newVerifyCode */
    newVerifyCode: string;
    /** verifyCode */
    verifyCode: string;
  };

  type changePasswordUsingPOSTParams = {
    confirmPassword?: string;
    newPassword?: string;
    oldPassword?: string;
  };

  type changePhoneUsingPOSTParams = {
    /** newPhone */
    newPhone: string;
    /** newVerifyCode */
    newVerifyCode: string;
    /** verifyCode */
    verifyCode: string;
  };

  type clientSeedHistoryUsingGETParams = {
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
  };

  type createBattleUsingPOSTParams = {
    /** boxLists */
    boxLists: string;
    /** countCustomer */
    countCustomer: number;
    /** mode */
    mode?: number;
    /** pos */
    pos?: number;
    /** title */
    title: string;
  };

  type CurrencyRateVo = {
    createTime?: string;
    currencyFrom?: string;
    currencyTo?: string;
    delFlag?: boolean;
    id?: number;
    modifyTime?: string;
    rate?: number;
    remark?: string;
    symbol?: string;
  };

  type CustomerBounsPageVo = {
    customerBounsVos?: GradeCustomerVo[];
    customerExp?: number;
    maxExp?: number;
  };

  type CustomerDetailVo = {
    activity?: number;
    balance?: number;
    checkInTimes?: number;
    experience?: number;
    experienceMax?: number;
    experiencePercentage?: number;
    grade?: number;
    headGround?: string;
    headPic?: string;
    id?: number;
    inviterId?: number;
    inviterIdHeadPic?: string;
    inviterNickname?: string;
    inviterPromotionCode?: string;
    lastLoginIp?: string;
    lastLoginLocation?: string;
    lastLoginTime?: string;
    mail?: string;
    nickname?: string;
    phone?: string;
    rebateType?: number;
    rebateValue?: number;
    secondaryBalance?: number;
    secret?: string;
    signedInToday?: boolean;
    steamId?: string;
    totalCheckInTimes?: number;
    tradeUrl?: string;
    verified?: boolean;
    firstRechargeRebate?: number;
    promotionChannelId?: string;
  };

  type CycleRedPacketVo = {
    accumulatedAmount?: number;
    amountMax?: number;
    amountMin?: number;
    createTime?: string;
    cycleType?: string;
    delFlag?: boolean;
    endTime?: string;
    id?: number;
    leftTime?: number;
    modifyTime?: string;
    num?: number;
    receiveStatus?: boolean;
    remark?: string;
    startTime?: string;
    state?: number;
    subtitle?: string;
    templateId?: number;
    title?: string;
    totalNum?: number;
  };

  type detailUsingGETParams = {
    /** giveawayId */
    giveawayId: number;
  };

  type exchangeQuantityUsingPOST1Params = {
    /** ids */
    ids: number[];
  };

  type exchangeQuantityUsingPOSTParams = {
    /** ids */
    ids: number[];
  };

  type exchangeVoucherStockUsingPOSTParams = {
    /** couponId */
    couponId?: number;
    /** stockId */
    stockId: number;
  };

  type ExtPageInfoMyVoucherVoMyVoucherCountVo_ = {
    extData?: MyVoucherCountVo;
    page?: number;
    pageData?: MyVoucherVo[];
    pageSize?: number;
    totalPages?: number;
    totalRows?: number;
  };

  type ExtPageInfoVoucherMyVoucherCountVo_ = {
    extData?: MyVoucherCountVo;
    page?: number;
    pageData?: Voucher[];
    pageSize?: number;
    totalPages?: number;
    totalRows?: number;
  };

  type findpwdUsingPOSTParams = {
    channelCode?: string;
    clientIp?: string;
    comeFrom?: number;
    id?: string;
    password?: string;
    promoteCode?: string;
    'steamUserInfo.avatar'?: string;
    'steamUserInfo.name'?: string;
    'steamUserInfo.profileurl'?: string;
    'steamUserInfo.steamid'?: string;
    'steamUserInfo.timecreated'?: number;
    type?: number;
    verifyCode?: string;
  };

  type FuxinCallback = {
    error?: string;
    goodsId?: string;
    paytype?: string;
    platformId?: string;
    price?: string;
    sdorderno?: string;
    sign?: string;
    status?: string;
  };

  type getBattleDetailUsingGETParams = {
    /** battleCode */
    battleCode: string;
  };

  type getBattleResultsUsingGETParams = {
    /** battleCode */
    battleCode: string;
  };

  type getBoxListUsingGETParams = {
    /** boxType */
    boxType?: number;
    /** moduleId */
    moduleId?: number;
    /** visibleRoom */
    visibleRoom?: boolean;
  };

  type getCurrentPageUsingGETParams = {
    /** mode */
    mode?: number;
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
  };

  type getMyBalanceLogUsingGETParams = {
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
  };

  type getMyBoxLogPageUsingGETParams = {
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
  };

  type getMyCouponPageUsingGETParams = {
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
  };

  type getMyCouponsUsingGETParams = {
    /** 折扣券类型,0->商城折扣券，1->开箱折扣券,2->充值折扣券,-1->全部 */
    couponType?: number;
  };

  type getMyDreamLogUsingGETParams = {
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
  };

  type getMyFreeBoxPageUsingGETParams = {
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
  };

  type getMyOrnamentPageUsingGETParams = {
    /** 模块ID */
    moduleId?: number;
    /** true->按价格倒序，false->按价格正序 */
    orderByPrice?: boolean;
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
  };

  type getMyPageUsingGETParams = {
    /** mode */
    mode?: number;
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
  };

  type getMyRechargeOrderPageUsingGETParams = {
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
  };

  type getMyRetrievalPageUsingGETParams = {
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
  };

  type getMyRewardPageUsingGETParams = {
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
  };

  type getMyStockOrderPageUsingGETParams = {
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
  };

  type getMyUpgradePageUsingGETParams = {
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
  };

  type getMyVoucherPageUsingGETParams = {
    /** orderByPrice */
    orderByPrice?: boolean;
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
    /** stat */
    stat?: number;
  };

  type getPageUsingGETParams = {
    /** mode */
    mode?: number;
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
    /** state */
    state?: number;
  };

  type getVoucherStockPageUsingGETParams = {
    /** exterior */
    exterior?: string;
    /** keyword */
    keyword?: string;
    /** 模块ID */
    moduleId?: number;
    /** orderByPrice */
    orderByPrice?: boolean;
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
    /** priceMax */
    priceMax?: number;
    /** priceMin */
    priceMin?: number;
    /** weaponType */
    weaponType?: string;
  };

  type giftListUsingGETParams = {
    /** giveawayId */
    giveawayId?: number;
  };

  type GradeCustomerVo = {
    cdkInfo?: string;
    couponInfo?: string;
    couponTitle?: string;
    createTime?: string;
    delFlag?: boolean;
    expMax?: number;
    expMin?: number;
    grade?: number;
    headGround?: string;
    id?: number;
    modifyTime?: string;
    receive?: boolean;
    rechargeDiscount?: number;
    remark?: string;
    rewardId?: number;
    rollInfo?: string;
  };

  type GradeGiftProb = {
    grade?: number;
    prob?: number;
  };

  type GradeInfoVo = {
    cdkInfo?: string;
    couponInfo?: string;
    couponTitle?: string;
    createTime?: string;
    delFlag?: boolean;
    expMax?: number;
    expMin?: number;
    grade?: number;
    gradeBoxes?: MyGradeBoxVo[];
    headGround?: string;
    id?: number;
    modifyTime?: string;
    prizes?: PrizeVo[];
    rechargeDiscount?: number;
    remark?: string;
    rewardId?: number;
    rewardImage?: string;
    rewardName?: string;
    rollInfo?: string;
  };

  type jjkCallbackUsingPOSTParams = {
    /** ext_sign */
    ext_sign?: string;
    /** member_id */
    member_id?: string;
    /** out_trade_no */
    out_trade_no?: string;
    /** pay_type */
    pay_type?: string;
    /** result_code */
    result_code?: string;
    /** sign */
    sign?: string;
    /** time_end */
    time_end?: string;
    /** total_fee */
    total_fee?: string;
    /** trade_no */
    trade_no?: string;
  };

  type joinBattleUsingPOSTParams = {
    /** battleCode */
    battleCode: string;
    /** pos */
    pos?: number;
  };

  type joinBotUsingPOSTParams = {
    /** battleCode */
    battleCode: string;
    /** botId */
    botId?: number;
    /** pos */
    pos?: number;
  };

  type keyHistoryUsingGETParams = {
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
  };

  type listUsingPOSTParams = {
    /** grade */
    grade?: number;
  };

  type loginForTrialUsingPOSTParams = {
    /** 图形验证码key */
    captchaKey: string;
    /** 图形验证码值 */
    captchaValue: string;
  };

  type loginUsingPOSTParams = {
    /** id */
    id?: string;
    /** password */
    password?: string;
    /** type */
    type?: number;
  };

  type makePaymentUsingPOSTParams = {
    /** couponId */
    couponId?: number;
    /** currencyCode */
    currencyCode?: string;
    /** quantity */
    quantity: number;
    /** rechargeChannelId */
    rechargeChannelId: number;
  };

  type modifyInvitationCodeUsingPOSTParams = {
    /** invitationCode */
    invitationCode: string;
  };

  type modifyNicknameUsingPOSTParams = {
    /** nickname */
    nickname: string;
  };

  type modifySecretUsingPOSTParams = {
    /** secret */
    secret: string;
  };

  type modifyTradeUrlUsingPOSTParams = {
    /** smsCode */
    smsCode: string;
    /** tradeUrl */
    tradeUrl: string;
  };

  type MyBalanceLogVo = {
    actionType?: number;
    actionTypeName?: string;
    amount?: number;
    balanceAfter?: number;
    balanceBefore?: number;
    balanceType?: number;
    createTime?: string;
    customerId?: number;
    delFlag?: boolean;
    eventType?: number;
    eventTypeName?: string;
    id?: number;
    modifyTime?: string;
    orderId?: string;
    remark?: string;
    updateTime?: string;
  };

  type MyBoxLogPageVo = {
    bcFlag?: boolean;
    boxId?: number;
    boxName?: string;
    createTime?: string;
    customerId?: number;
    delFlag?: boolean;
    giftId?: number;
    grade?: number;
    id?: number;
    modifyTime?: string;
    publicHash?: string;
    recoveryPrice?: number;
    remark?: string;
    rollCode?: number;
    round?: number;
    verifyId?: number;
    voucherId?: number;
    voucherName?: string;
  };

  type MyCouponPageVo = {
    couponName?: string;
    couponType?: number;
    createTime?: string;
    customerId?: number;
    delFlag?: boolean;
    id?: number;
    modifyTime?: string;
    remark?: string;
    rewardOrCouponId?: number;
    rewardVoucherType?: number;
    state?: number;
  };

  type MyCouponVo = {
    boxDiscount?: number;
    boxId?: number;
    couponId?: number;
    couponName?: string;
    couponType?: number;
    rechargeAmount?: number;
    rechargeDiscount?: number;
    stockDiscount?: number;
    stockId?: number;
    stockThreshold?: number;
    validDays?: number;
  };

  type MyFreeBoxPageVo = {
    boxId?: number;
    boxName?: string;
    createTime?: string;
    currentTimes?: number;
    customerId?: number;
    delFlag?: boolean;
    gifts?: BoxGiftVo[];
    graceTimes?: number;
    id?: number;
    maxTimes?: number;
    modifyTime?: string;
    remark?: string;
  };

  type MyGradeBoxVo = {
    boxId?: number;
    boxImage?: string;
    boxName?: string;
    createTime?: string;
    delFlag?: boolean;
    gifts?: BoxGiftVo[];
    gradeId?: number;
    id?: number;
    modifyTime?: string;
    remark?: string;
    times?: number;
  };

  type myPromotionLogPageUsingGETParams = {
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
  };

  type MyPromotionLogPageVo = {
    createTime?: string;
    customerId?: number;
    delFlag?: boolean;
    id?: number;
    modifyTime?: string;
    nickname?: string;
    promoterId?: number;
    rebateAmount?: number;
    rebateRate?: number;
    rechargeOrderId?: number;
    rechargeQuantity?: number;
    rechargeTime?: string;
    remark?: string;
  };

  type MyRechargeOrderPageVo = {
    amount?: number;
    channelName?: string;
    channelType?: number;
    createTime?: string;
    currency?: string;
    customerId?: number;
    delFlag?: boolean;
    id?: number;
    modifyTime?: string;
    orderId?: string;
    parentId?: string;
    payUrl?: string;
    quantity?: number;
    rechargeChannelId?: number;
    remark?: string;
    rewardVoucherId?: number;
    state?: number;
  };

  type MyRetrievalPageVo = {
    createTime?: string;
    customerId?: number;
    delFlag?: boolean;
    id?: number;
    modifyTime?: string;
    orderId?: string;
    ornamentId?: number;
    ornamentName?: string;
    recoveryPrice?: number;
    remark?: string;
    retrievalType?: number;
    state?: number;
    updateTime?: string;
  };

  type MyRewardPageVo = {
    createTime?: string;
    customerId?: number;
    delFlag?: boolean;
    id?: number;
    modifyTime?: string;
    prizes?: PrizeVo[];
    remark?: string;
    rewardName?: string;
    rewardOrCouponId?: number;
    rewardType?: number;
    rewardVoucherType?: number;
    state?: number;
  };

  type MyStockOrderPageVo = {
    actionType?: number;
    createTime?: string;
    customerId?: number;
    delFlag?: boolean;
    eventType?: number;
    grade?: number;
    id?: number;
    modifyTime?: string;
    recoveryPrice?: number;
    remark?: string;
    voucherId?: number;
    voucherName?: string;
  };

  type MyTaskVo = {
    actions?: TaskAction[];
    activity?: number;
    complete?: boolean;
    completeCount?: number;
    cycleMode?: number;
    description?: string;
    exp?: number;
    expireTime?: string;
    id?: number;
    prizeList?: PrizeVo[];
    quantity?: number;
    reward?: boolean;
    rewardId?: number;
    rewardName?: string;
    taskName?: string;
    total?: number;
  };

  type MyUpgradePageVo = {
    createTime?: string;
    dreamFee?: number;
    id?: number;
    publicHash?: string;
    rollCode?: number;
    rollCodeHigh?: number;
    rollCodeLow?: number;
    round?: number;
    state?: number;
    stateDesc?: string;
    verifyId?: number;
    winRecoveryPrice?: string;
    winVoucherImg?: string;
    winVoucherName?: string;
  };

  type MyVoucherCountVo = {
    totalCount?: number;
    totalPrice?: number;
  };

  type myVoucherUsingGETParams = {
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
  };

  type MyVoucherVo = {
    createTime?: string;
    customerId?: number;
    delFlag?: boolean;
    giftImage?: string;
    giftTemplateId?: number;
    grade?: number;
    id?: number;
    itemId?: number;
    modifyTime?: string;
    recoveryPrice?: number;
    remark?: string;
    retrievedState?: number;
    sourceId?: string;
    sourceType?: string;
    state?: number;
    stateStr?: string;
    subSourceId?: string;
    targetType?: number;
    verifyId?: string;
    voucherName?: string;
    zbtAcceptablePrice?: number;
  };

  type OpenBoxResult = {
    results?: OpenBoxResultVo[];
    show?: boolean;
    showTime?: string;
  };

  type OpenBoxResultVo = {
    boxId?: number;
    boxImage?: string;
    boxName?: string;
    giftId?: number;
    giftImage?: string;
    giftName?: string;
    grade?: number;
    id?: number;
    publishHash?: string;
    recoveryPrice?: number;
    rollCode?: number;
    round?: number;
    voucherId?: number;
  };

  type openFreeBoxUsingGETParams = {
    /** boxId */
    boxId: number;
    /** number */
    number?: number;
  };

  type Ornament = {
    createTime?: string;
    customerId?: number;
    delFlag?: boolean;
    giftTemplateId?: number;
    grade?: number;
    guaranteeTime?: string;
    id?: number;
    marketHashName?: string;
    modifyTime?: string;
    moduleId?: number;
    ornamentImage?: string;
    ornamentName?: string;
    recoveryPrice?: number;
    remark?: string;
    state?: number;
    voucherId?: number;
    zbtAcceptablePrice?: number;
  };

  type OrnamentRetrievalResultVo = {
    createTime?: string;
    customerId?: number;
    delFlag?: boolean;
    giftTemplateId?: number;
    grade?: number;
    guaranteeTime?: string;
    id?: number;
    marketHashName?: string;
    modifyTime?: string;
    moduleId?: number;
    ornamentImage?: string;
    ornamentName?: string;
    recoveryPrice?: number;
    remark?: string;
    result?: boolean;
    state?: number;
    voucherId?: number;
    zbtAcceptablePrice?: number;
  };

  type ornamentRetrievalUsingPOSTParams = {
    /** ids */
    ids: number[];
  };

  type PageInfoBattleVo_ = {
    page?: number;
    pageData?: BattleVo[];
    pageSize?: number;
    totalPages?: number;
    totalRows?: number;
  };

  type PageInfoBoxPageVo_ = {
    page?: number;
    pageData?: BoxPageVo[];
    pageSize?: number;
    totalPages?: number;
    totalRows?: number;
  };

  type PageInfoMyBalanceLogVo_ = {
    page?: number;
    pageData?: MyBalanceLogVo[];
    pageSize?: number;
    totalPages?: number;
    totalRows?: number;
  };

  type PageInfoMyBoxLogPageVo_ = {
    page?: number;
    pageData?: MyBoxLogPageVo[];
    pageSize?: number;
    totalPages?: number;
    totalRows?: number;
  };

  type PageInfoMyCouponPageVo_ = {
    page?: number;
    pageData?: MyCouponPageVo[];
    pageSize?: number;
    totalPages?: number;
    totalRows?: number;
  };

  type PageInfoMyFreeBoxPageVo_ = {
    page?: number;
    pageData?: MyFreeBoxPageVo[];
    pageSize?: number;
    totalPages?: number;
    totalRows?: number;
  };

  type PageInfoMyPromotionLogPageVo_ = {
    page?: number;
    pageData?: MyPromotionLogPageVo[];
    pageSize?: number;
    totalPages?: number;
    totalRows?: number;
  };

  type PageInfoMyRechargeOrderPageVo_ = {
    page?: number;
    pageData?: MyRechargeOrderPageVo[];
    pageSize?: number;
    totalPages?: number;
    totalRows?: number;
  };

  type PageInfoMyRetrievalPageVo_ = {
    page?: number;
    pageData?: MyRetrievalPageVo[];
    pageSize?: number;
    totalPages?: number;
    totalRows?: number;
  };

  type PageInfoMyRewardPageVo_ = {
    page?: number;
    pageData?: MyRewardPageVo[];
    pageSize?: number;
    totalPages?: number;
    totalRows?: number;
  };

  type PageInfoMyStockOrderPageVo_ = {
    page?: number;
    pageData?: MyStockOrderPageVo[];
    pageSize?: number;
    totalPages?: number;
    totalRows?: number;
  };

  type PageInfoMyUpgradePageVo_ = {
    page?: number;
    pageData?: MyUpgradePageVo[];
    pageSize?: number;
    totalPages?: number;
    totalRows?: number;
  };

  type PageInfoOrnament_ = {
    page?: number;
    pageData?: Ornament[];
    pageSize?: number;
    totalPages?: number;
    totalRows?: number;
  };

  type PageInfoRandKeyVo_ = {
    page?: number;
    pageData?: RandKeyVo[];
    pageSize?: number;
    totalPages?: number;
    totalRows?: number;
  };

  type PageInfoRollRoomPageVo_ = {
    page?: number;
    pageData?: RollRoomPageVo[];
    pageSize?: number;
    totalPages?: number;
    totalRows?: number;
  };

  type PageInfoUpgradeGiftPageVo_ = {
    page?: number;
    pageData?: UpgradeGiftPageVo[];
    pageSize?: number;
    totalPages?: number;
    totalRows?: number;
  };

  type PageInfoUpgradePageVo_ = {
    page?: number;
    pageData?: UpgradePageVo[];
    pageSize?: number;
    totalPages?: number;
    totalRows?: number;
  };

  type PageInfoVoucherStockPageVo_ = {
    page?: number;
    pageData?: VoucherStockPageVo[];
    pageSize?: number;
    totalPages?: number;
    totalRows?: number;
  };

  type pageUsingGET1Params = {
    /** 外观 */
    exterior?: string;
    /** 物品名称 */
    giftName?: string;
    /** 价格排序 */
    orderByPrice?: boolean;
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
    /** 品质 */
    quality?: string;
    /** 稀有度 */
    rarity?: string;
    /** 类型 */
    type?: string;
  };

  type pageUsingGETParams = {
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
    /** state */
    state?: number;
    /** type */
    type?: number;
  };

  type partakeListUsingGETParams = {
    /** giveawayId */
    giveawayId?: number;
  };

  type partakeUsingPOSTParams = {
    /** giveawayId */
    giveawayId?: number;
    /** pwd */
    pwd?: string;
  };

  type paymentStateUsingGETParams = {
    /** orderId */
    orderId: string;
  };

  type PaymentVo = {
    orderId?: string;
    payUrl?: string;
  };

  type PrizeVo = {
    createTime?: string;
    delFlag?: boolean;
    id?: number;
    modifyTime?: string;
    prize?: string;
    prizeDetails?: string;
    prizeType?: number;
    probability?: number;
    remark?: string;
    rewardId?: number;
    voucherGrade?: number;
  };

  type Promotion = {
    createTime?: string;
    delFlag?: boolean;
    grade?: number;
    id?: number;
    modifyTime?: string;
    rebateAmountMax?: number;
    rebateAmountMin?: number;
    rebateRate?: number;
    remark?: string;
    userRebateType?: number;
    userRebateValue?: number;
  };

  type PromotionInfoVo = {
    accumulatedRebateAmount?: number;
    accumulatedRechargeAmount?: number;
    accumulatedRechargeCount?: number;
    accumulatedRegisterCount?: number;
    invitationCode?: string;
    nextPromotionGrade?: number;
    promotionGrade?: number;
    rebateRate?: number;
    upInvitationCode?: string;
  };

  type RandKeyVo = {
    clientSeed?: string;
    createTime?: string;
    delFlag?: boolean;
    id?: number;
    isPublic?: boolean;
    modifyTime?: string;
    publicHash?: string;
    remark?: string;
    rollCode?: number;
    round?: number;
    secretHash?: string;
    secretSalt?: string;
    sourceId?: number;
    sourceType?: string;
  };

  type receiveCycleRedPacketUsingPOSTParams = {
    /** redPacketId */
    redPacketId: number;
  };

  type receiveUsingPOSTParams = {
    /** code */
    code: string;
  };

  type recentBoxGiftUsingGETParams = {
    /** caseId */
    caseId: number;
    /** isTop */
    isTop?: boolean;
    /** limit */
    limit?: number;
  };

  type RecentBoxGiftVo = {
    boxId?: number;
    boxImage?: string;
    boxName?: string;
    createTime?: string;
    giftImage?: string;
    grade?: number;
    headGround?: string;
    headPic?: string;
    id?: number;
    nickname?: string;
    publicHash?: string;
    recoveryPrice?: number;
    rollCode?: number;
    round?: number;
    verifyId?: number;
    voucherName?: string;
  };

  type recentDropUsingGETParams = {
    /** isTop */
    isTop?: boolean;
    /** limit */
    limit?: number;
  };

  type RecentDropVo = {
    createTime?: string;
    giftImage?: string;
    giftName?: string;
    grade?: number;
    headGround?: string;
    headPic?: string;
    id?: number;
    nickname?: string;
    recoveryPrice?: number;
    sourceId?: number;
    sourceImage?: string;
    sourceName?: string;
    sourceType?: number;
  };

  type RechargeChannelVo = {
    bonusRate?: number;
    channelName?: string;
    channelType?: number;
    createTime?: string;
    currencyCode?: string;
    currencyCodeList?: string[];
    delFlag?: boolean;
    displayType?: number;
    id?: number;
    languageCode?: string;
    logo?: string;
    modifyTime?: string;
    rechargeConfigId?: number;
    remark?: string;
    state?: number;
    ua?: string;
    weight?: number;
  };

  type RechargeConfigVo = {
    currencyRateVoList?: CurrencyRateVo[];
    languageList?: string[];
    rechargeAmountAllowList?: number[];
    rechargeChannelList?: RechargeChannelVo[];
  };

  type RechargeCouponRecordVo = {
    couponId?: number;
    couponName?: string;
    couponType?: number;
    createTime?: string;
    customerId?: number;
    delFlag?: boolean;
    expirationTime?: string;
    grantTime?: string;
    id?: number;
    modifyTime?: string;
    nickname?: string;
    rechargeAmount?: number;
    rechargeDiscount?: number;
    remark?: string;
    state?: number;
  };

  type RechargeDiscountInfoVo = {
    customerId?: number;
    grade?: number;
    hasRecharge?: boolean;
    promotionType?: string;
    rechargeDiscount?: number;
    rechargeExchangeRate?: number;
    rechargeGiveType?: boolean;
  };

  type RechargeOrderVo = {
    amount?: number;
    channelType?: number;
    createTime?: string;
    currency?: string;
    customerId?: number;
    delFlag?: boolean;
    id?: number;
    modifyTime?: string;
    orderId?: string;
    parentId?: string;
    payUrl?: string;
    quantity?: number;
    rechargeChannelId?: number;
    remark?: string;
    rewardVoucherId?: number;
    show?: boolean;
    showTime?: string;
    state?: number;
    firstRechargeFlag?: boolean;
  };

  type resetUsingPOSTParams = {
    /** clientSeed */
    clientSeed?: string;
  };

  type ResultDataActivityInfoVo_ = {
    data?: ActivityInfoVo;
    msg?: string;
    status?: number;
  };

  type ResultDataActivityRewardResultVo_ = {
    data?: ActivityRewardResultVo;
    msg?: string;
    status?: number;
  };

  type ResultDataAmountInfoVo_ = {
    data?: AmountInfoVo;
    msg?: string;
    status?: number;
  };

  type ResultDataAuthLoginVo_ = {
    data?: AuthLoginVo;
    msg?: string;
    status?: number;
  };

  type ResultDataBattleDetailVo_ = {
    data?: BattleDetailVo;
    msg?: string;
    status?: number;
  };

  type ResultDataBattleRankPageVo_ = {
    data?: BattleRankPageVo;
    msg?: string;
    status?: number;
  };

  type ResultDataBattleResultVo_ = {
    data?: BattleResultVo;
    msg?: string;
    status?: number;
  };

  type ResultDataBoolean_ = {
    data?: boolean;
    msg?: string;
    status?: number;
  };

  type ResultDataBoxDetailVo_ = {
    data?: BoxDetailVo;
    msg?: string;
    status?: number;
  };

  type ResultDataBoxGiftInfoVo_ = {
    data?: BoxGiftInfoVo;
    msg?: string;
    status?: number;
  };

  type ResultDataCustomerBounsPageVo_ = {
    data?: CustomerBounsPageVo;
    msg?: string;
    status?: number;
  };

  type ResultDataCustomerDetailVo_ = {
    data?: CustomerDetailVo;
    msg?: string;
    status?: number;
  };

  type ResultDataExtPageInfoMyVoucherVoMyVoucherCountVo_ = {
    data?: ExtPageInfoMyVoucherVoMyVoucherCountVo_;
    msg?: string;
    status?: number;
  };

  type ResultDataExtPageInfoVoucherMyVoucherCountVo_ = {
    data?: ExtPageInfoVoucherMyVoucherCountVo_;
    msg?: string;
    status?: number;
  };

  type ResultDataGradeInfoVo_ = {
    data?: GradeInfoVo;
    msg?: string;
    status?: number;
  };

  type ResultDataListBattleVo_ = {
    data?: BattleVo[];
    msg?: string;
    status?: number;
  };

  type ResultDataListBoxThemeListVo_ = {
    data?: BoxThemeListVo[];
    msg?: string;
    status?: number;
  };

  type ResultDataListCycleRedPacketVo_ = {
    data?: CycleRedPacketVo[];
    msg?: string;
    status?: number;
  };

  type ResultDataListInt_ = {
    data?: number[];
    msg?: string;
    status?: number;
  };

  type ResultDataListMyCouponVo_ = {
    data?: MyCouponVo[];
    msg?: string;
    status?: number;
  };

  type ResultDataListMyTaskVo_ = {
    data?: MyTaskVo[];
    msg?: string;
    status?: number;
  };

  type ResultDataListOpenBoxResultVo_ = {
    data?: OpenBoxResultVo[];
    msg?: string;
    status?: number;
  };

  type ResultDataListOrnamentRetrievalResultVo_ = {
    data?: OrnamentRetrievalResultVo[];
    msg?: string;
    status?: number;
  };

  type ResultDataListPromotion_ = {
    data?: Promotion[];
    msg?: string;
    status?: number;
  };

  type ResultDataListRecentBoxGiftVo_ = {
    data?: RecentBoxGiftVo[];
    msg?: string;
    status?: number;
  };

  type ResultDataListRecentDropVo_ = {
    data?: RecentDropVo[];
    msg?: string;
    status?: number;
  };

  type ResultDataListRechargeCouponRecordVo_ = {
    data?: RechargeCouponRecordVo[];
    msg?: string;
    status?: number;
  };

  type ResultDataListRollCustomerVo_ = {
    data?: RollCustomerVo[];
    msg?: string;
    status?: number;
  };

  type ResultDataListRollCustomerWithGiftVo_ = {
    data?: RollCustomerWithGiftVo[];
    msg?: string;
    status?: number;
  };

  type ResultDataListRollRoomGiftVo_ = {
    data?: RollRoomGiftVo[];
    msg?: string;
    status?: number;
  };

  type ResultDataListRollRoomPageVo_ = {
    data?: RollRoomPageVo[];
    msg?: string;
    status?: number;
  };

  type ResultDataListSteamTagVo_ = {
    data?: SteamTagVo[];
    msg?: string;
    status?: number;
  };

  type ResultDataListUseRewardVoucherResultVo_ = {
    data?: UseRewardVoucherResultVo[];
    msg?: string;
    status?: number;
  };

  type ResultDataOpenBoxResult_ = {
    data?: OpenBoxResult;
    msg?: string;
    status?: number;
  };

  type ResultDataPageInfoBattleVo_ = {
    data?: PageInfoBattleVo_;
    msg?: string;
    status?: number;
  };

  type ResultDataPageInfoBoxPageVo_ = {
    data?: PageInfoBoxPageVo_;
    msg?: string;
    status?: number;
  };

  type ResultDataPageInfoMyBalanceLogVo_ = {
    data?: PageInfoMyBalanceLogVo_;
    msg?: string;
    status?: number;
  };

  type ResultDataPageInfoMyBoxLogPageVo_ = {
    data?: PageInfoMyBoxLogPageVo_;
    msg?: string;
    status?: number;
  };

  type ResultDataPageInfoMyCouponPageVo_ = {
    data?: PageInfoMyCouponPageVo_;
    msg?: string;
    status?: number;
  };

  type ResultDataPageInfoMyFreeBoxPageVo_ = {
    data?: PageInfoMyFreeBoxPageVo_;
    msg?: string;
    status?: number;
  };

  type ResultDataPageInfoMyPromotionLogPageVo_ = {
    data?: PageInfoMyPromotionLogPageVo_;
    msg?: string;
    status?: number;
  };

  type ResultDataPageInfoMyRechargeOrderPageVo_ = {
    data?: PageInfoMyRechargeOrderPageVo_;
    msg?: string;
    status?: number;
  };

  type ResultDataPageInfoMyRetrievalPageVo_ = {
    data?: PageInfoMyRetrievalPageVo_;
    msg?: string;
    status?: number;
  };

  type ResultDataPageInfoMyRewardPageVo_ = {
    data?: PageInfoMyRewardPageVo_;
    msg?: string;
    status?: number;
  };

  type ResultDataPageInfoMyStockOrderPageVo_ = {
    data?: PageInfoMyStockOrderPageVo_;
    msg?: string;
    status?: number;
  };

  type ResultDataPageInfoMyUpgradePageVo_ = {
    data?: PageInfoMyUpgradePageVo_;
    msg?: string;
    status?: number;
  };

  type ResultDataPageInfoOrnament_ = {
    data?: PageInfoOrnament_;
    msg?: string;
    status?: number;
  };

  type ResultDataPageInfoRandKeyVo_ = {
    data?: PageInfoRandKeyVo_;
    msg?: string;
    status?: number;
  };

  type ResultDataPageInfoRollRoomPageVo_ = {
    data?: PageInfoRollRoomPageVo_;
    msg?: string;
    status?: number;
  };

  type ResultDataPageInfoUpgradeGiftPageVo_ = {
    data?: PageInfoUpgradeGiftPageVo_;
    msg?: string;
    status?: number;
  };

  type ResultDataPageInfoUpgradePageVo_ = {
    data?: PageInfoUpgradePageVo_;
    msg?: string;
    status?: number;
  };

  type ResultDataPageInfoVoucherStockPageVo_ = {
    data?: PageInfoVoucherStockPageVo_;
    msg?: string;
    status?: number;
  };

  type ResultDataPaymentVo_ = {
    data?: PaymentVo;
    msg?: string;
    status?: number;
  };

  type ResultDataPromotionInfoVo_ = {
    data?: PromotionInfoVo;
    msg?: string;
    status?: number;
  };

  type ResultDataRandKeyVo_ = {
    data?: RandKeyVo;
    msg?: string;
    status?: number;
  };

  type ResultDataRechargeConfigVo_ = {
    data?: RechargeConfigVo;
    msg?: string;
    status?: number;
  };

  type ResultDataRechargeDiscountInfoVo_ = {
    data?: RechargeDiscountInfoVo;
    msg?: string;
    status?: number;
  };

  type ResultDataRechargeOrderVo_ = {
    data?: RechargeOrderVo;
    msg?: string;
    status?: number;
  };

  type ResultDataRollRoomPageVo_ = {
    data?: RollRoomPageVo;
    msg?: string;
    status?: number;
  };

  type ResultDataSignInInfoVo_ = {
    data?: SignInInfoVo;
    msg?: string;
    status?: number;
  };

  type ResultDataSignInListVo_ = {
    data?: SignInListVo;
    msg?: string;
    status?: number;
  };

  type ResultDataString_ = {
    data?: string;
    msg?: string;
    status?: number;
  };

  type ResultDataUpgradeConfigVo_ = {
    data?: UpgradeConfigVo;
    msg?: string;
    status?: number;
  };

  type ResultDataUpgradeResultVo_ = {
    data?: UpgradeResultVo;
    msg?: string;
    status?: number;
  };

  type rewardUsingPOSTParams = {
    /** taskId */
    taskId: number;
  };

  type RollCustomerVo = {
    headGround?: string;
    headPic?: string;
    id?: number;
    nickname?: string;
  };

  type RollCustomerWithGiftVo = {
    giftVos?: RollRoomGiftVo[];
    headGround?: string;
    headPic?: string;
    id?: number;
    nickname?: string;
  };

  type RollRoomGiftVo = {
    giftImage?: string;
    giftName?: string;
    giftTemplateId?: number;
    grade?: number;
    id?: number;
    recoveryPrice?: number;
    winnerInfo?: RollCustomerVo;
  };

  type RollRoomPageVo = {
    accumulatedAmount?: number;
    assignMethod?: number;
    banner?: string;
    giftCount?: number;
    giftVos?: RollRoomGiftVo[];
    id?: number;
    joinFlag?: boolean;
    leftTime?: number;
    openTime?: string;
    openType?: number;
    poolValue?: number;
    pwdFlag?: boolean;
    rechargeEndTime?: string;
    rechargeStartTime?: string;
    remark?: string;
    roomType?: number;
    state?: number;
    title?: string;
    userCount?: number;
    weight?: number;
  };

  type securityCheckUsingPOSTParams = {
    id?: string;
    type?: number;
    verifyCode?: string;
  };

  type SignInInfoVo = {
    signIns?: SignInListVo[];
    signedInToday?: boolean;
  };

  type signInListUsingGETParams = {
    /** days */
    days?: number;
  };

  type SignInListVo = {
    activity?: number;
    createTime?: string;
    date?: string;
    daysMax?: number;
    daysMin?: number;
    delFlag?: boolean;
    exp?: number;
    id?: number;
    modifyTime?: string;
    prizes?: PrizeVo[];
    quantity?: number;
    remark?: string;
    rewardId?: number;
    rewardName?: string;
    signInName?: string;
    signedIn?: boolean;
  };

  type signUpUsingPOSTParams = {
    channelCode?: string;
    clientIp?: string;
    comeFrom?: number;
    id?: string;
    password?: string;
    promoteCode?: string;
    'steamUserInfo.avatar'?: string;
    'steamUserInfo.name'?: string;
    'steamUserInfo.profileurl'?: string;
    'steamUserInfo.steamid'?: string;
    'steamUserInfo.timecreated'?: number;
    type?: number;
    verifyCode?: string;
  };

  type smsLoginUsingPOSTParams = {
    /** code */
    code?: string;
    /** id */
    id?: string;
  };

  type steamLoginUsingGETParams = {
    /** callbackUrl */
    callbackUrl: string;
  };

  type steamSignUpUsingGETParams = {
    /** query */
    query: string;
  };

  type SteamTagVo = {
    key?: string;
    name?: string;
    tags?: Tags[];
  };

  type Tags = {
    key?: string;
    name?: string;
  };

  type TaskAction = {
    condition?: string;
    current?: string;
    name?: string;
    type?: number;
  };

  type unionPayCallbackUsingPOST1Params = {
    /** unionpayCallback */
    unionpayCallback: Record<string, any>;
  };

  type unionPayH5CallbackUsingPOSTParams = {
    /** unionpayCallback */
    unionpayCallback: Record<string, any>;
  };

  type updateTradeUrlUsingPOSTParams = {
    /** tradeUrl */
    tradeUrl: string;
  };

  type UpgradeConfigVo = {
    maxProb?: number;
    minProb?: number;
    returnRate?: number;
  };

  type UpgradeGiftPageVo = {
    available?: boolean;
    createTime?: string;
    delFlag?: boolean;
    giftImage?: string;
    giftName?: string;
    giftTemplateId?: number;
    grade?: number;
    id?: number;
    modifyTime?: string;
    recoveryPrice?: number;
    remark?: string;
    zbtAcceptablePrice?: number;
  };

  type UpgradePageVo = {
    createTime?: string;
    customerId?: number;
    delFlag?: boolean;
    finalGiftId?: number;
    finalVoucherValue?: number;
    grade?: number;
    headGround?: string;
    headPic?: string;
    id?: number;
    mail?: string;
    modifyTime?: string;
    nickname?: string;
    phone?: string;
    publicHash?: string;
    quantity?: number;
    remark?: string;
    rollCode?: number;
    rollCodeHigh?: number;
    rollCodeLow?: number;
    round?: number;
    state?: number;
    steamId?: string;
    upgradeGiftId?: number;
    voucherInfos?: BoxGiftListVo[];
    winRecoveryPrice?: string;
    winVoucherImg?: string;
    winVoucherName?: string;
  };

  type upgradeRecordPageUsingGETParams = {
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
  };

  type UpgradeResultVo = {
    giftId?: number;
    giftImage?: string;
    giftName?: string;
    grace?: boolean;
    grade?: number;
    probability?: number;
    publicHash?: string;
    recoveryPrice?: number;
    rollCode?: number;
    rollCodeHigh?: number;
    rollCodeLow?: number;
    round?: number;
    show?: boolean;
    showTime?: string;
    upgradeGiftId?: number;
    upgradeId?: number;
    verifyId?: number;
    voucherId?: number;
    won?: boolean;
  };

  type uploadAvatarV2UsingPOSTParams = {
    /** headPic */
    headPic: string;
  };

  type useCardUsingPOSTParams = {
    /** cardNumber */
    cardNumber: string;
    /** cardPassword */
    cardPassword: string;
  };

  type useCdkeyUsingPOSTParams = {
    /** cdkey */
    cdkey: string;
  };

  type UseRewardVoucherResultVo = {
    createTime?: string;
    customerId?: number;
    delFlag?: boolean;
    id?: number;
    modifyTime?: string;
    prizes?: PrizeVo[];
    remark?: string;
    rewardOrCouponId?: number;
    rewardVoucherType?: number;
    state?: number;
  };

  type useRewardVoucherUsingPOSTParams = {
    /** rewardVoucherIds */
    rewardVoucherIds?: number[];
  };

  type v2OpenBoxUsingGETParams = {
    /** caseId */
    caseId: number;
    /** couponId */
    couponId?: number;
    /** number */
    number?: number;
  };

  type v3StartUpgradeUsingPOSTParams = {
    /** 额外支付的代币 */
    quantity: number;
    /** upgradeGiftIds */
    upgradeGiftIds?: string;
    /** 选择的背包物品  **/
    vouchers?: string
  };

  type verifyUsingGET1Params = {
    /** verifyId */
    verifyId: number;
  };

  type verifyUsingGETParams = {
    /** bizId */
    bizId: number;
    /** bizType */
    bizType: string;
  };

  type verifyUsingPOSTParams = {
    /** idCard */
    idCard: string;
    /** realName */
    realName: string;
    /** smsCode */
    smsCode: string;
  };

  type Voucher = {
    createTime?: string;
    customerId?: number;
    delFlag?: boolean;
    giftImage?: string;
    giftTemplateId?: number;
    grade?: number;
    id?: number;
    itemId?: number;
    modifyTime?: string;
    recoveryPrice?: number;
    remark?: string;
    sourceId?: string;
    sourceType?: string;
    state?: number;
    subSourceId?: string;
    targetType?: number;
    voucherName?: string;
    zbtAcceptablePrice?: number;
  };

  type VoucherStockPageVo = {
    available?: boolean;
    createTime?: string;
    delFlag?: boolean;
    giftImage?: string;
    giftName?: string;
    giftTemplateId?: number;
    grade?: number;
    id?: number;
    modifyTime?: string;
    moduleId?: number;
    recoveryPrice?: number;
    remark?: string;
  };

  type WinnerInfo = {
    winnerId?: number;
    winnerName?: string;
  };

  type winnerListUsingGETParams = {
    /** giveawayId */
    giveawayId?: number;
  };
}
