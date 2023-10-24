// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** callback POST /api/zbt/callback */
export async function callbackUsingPOST(
  body: Record<string, any>,
  options?: { [key: string]: any },
) {
  return request<string>('/api/zbt/callback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
