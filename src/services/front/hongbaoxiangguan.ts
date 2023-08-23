// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 红包列表 GET /api/redPacket/listCycleRedPacket */
export async function listCycleRedPacketUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultDataListCycleRedPacketVo_>('/api/redPacket/listCycleRedPacket', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 领取红包 POST /api/redPacket/receive */
export async function receiveUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.receiveUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataString_>('/api/redPacket/receive', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 领取周期红包 POST /api/redPacket/receiveCycleRedPacket */
export async function receiveCycleRedPacketUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.receiveCycleRedPacketUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDataString_>('/api/redPacket/receiveCycleRedPacket', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
