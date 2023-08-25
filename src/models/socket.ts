import WsEventType from '@/constants/eventType';
import { battleRankUsingGET } from '@/services/front/duizhanxiangguan';
import { recentDropUsingGET } from '@/services/front/zhandianweidushuju';
import { addImgHost, getSocketDomain } from '@/utils';
import { Client } from '@stomp/stompjs';
import { useRequest } from '@umijs/max';
import { useEffect, useState } from 'react';

export default () => {
  const [recentBox, setRecentBox] = useState<API.RecentOpenBoxGiftVo[]>([]);
  const [battleRoomCreate, setBattleRoomCreate] = useState<API.BattleVo>();
  const [battleState, setBattleState] = useState<API.BattleVo>();
  const [battleRank, setBattleRank] = useState<API.BattleRankPageVo>();
  const battleRankResult = useRequest(() => battleRankUsingGET());
  const [isTop, setIsTop] = useState<boolean>(false);
  const recentBoxResult = useRequest(
    () =>
      recentDropUsingGET({
        limit: 20,
        isTop,
      }),
    {
      refreshDeps: [isTop],
    },
  );

  useEffect(() => {
    if (battleRankResult.data) {
      setBattleRank(battleRankResult.data);
    }
  }, [battleRankResult.data]);

  useEffect(() => {
    if (recentBoxResult.data) {
      setRecentBox(recentBoxResult.data);
    }
  }, [recentBoxResult.data]);

  const parseWsResult = (result: string) => {
    try {
      const data: { eventType: WsEventType; data: any } = JSON.parse(result);
      if (data.data) {
        addImgHost(data.data);
      }

      switch (data.eventType) {
        case WsEventType.CASE_DROP ||
          WsEventType.BATTLE_DROP ||
          WsEventType.UPGRADE_DROP:
          if (isTop) {
            if (data.data.grade === 0 || data.data.grade === 1) {
              setRecentBox((prev) => {
                const newRecentBox = [...data.data, ...prev];
                return newRecentBox.slice(0, 20);
              });
            }
          } else {
            setRecentBox((prev) => {
              const newRecentBox = [...data.data, ...prev];
              return newRecentBox.slice(0, 20);
            });
          }

          break;
        case WsEventType.BATTLE_CREATE:
          setBattleRoomCreate(data.data);
          break;
        case WsEventType.BATTLE_STATE:
          setBattleState(data.data);
          break;
        case WsEventType.BATTLE_RANK:
          setBattleRank(data.data);
          break;
        default:
          break;
      }
    } catch (e) {
      console.error('parse ws result error', e);
    }
  };

  useEffect(() => {
    const domain = getSocketDomain();

    const client = new Client({
      brokerURL: domain,
      onConnect: () => {
        client.subscribe('/topic/messages', (message) => {
          parseWsResult(message.body);
        });
      },
    });

    client.activate();
    // 在组件卸载时关闭 WebSocket 连接
    return () => {
      client.deactivate();
    };
  }, []);

  return {
    recentBox,
    battleRoomCreate,
    battleState,
    battleRank,
    setIsTop,
    isTop,
  };
};
