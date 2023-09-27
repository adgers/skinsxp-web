import WsEventType from '@/constants/eventType';
import { battleRankUsingGET } from '@/services/front/duizhanxiangguan';
import { recentDropUsingGET } from '@/services/front/zhandianweidushuju';
import { addImgHost, getSocketDomain } from '@/utils';
import { Client } from '@stomp/stompjs';
import { useRequest } from '@umijs/max';
import { useEffect, useState } from 'react';

export default () => {
  const [recentBox, setRecentBox] = useState<API.RecentOpenBoxGiftVo[]>([]);
  const [topDropBox, setTopDropBox] = useState<API.RecentOpenBoxGiftVo[]>([]);
  const [battleRoomCreate, setBattleRoomCreate] = useState<API.BattleVo>();
  const [battleState, setBattleState] = useState<API.BattleVo>();
  const [battleRank, setBattleRank] = useState<API.BattleRankPageVo>();
  const [isTop, setIsTop] = useState<boolean>(false);
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);

  const battleRankResult = useRequest(
    async () => {
      if (!pageLoaded) return;
      return await battleRankUsingGET();
    },
    {
      refreshDeps: [pageLoaded],
    },
  );

  const recentBoxResult = useRequest(
    async () => {
      if (!pageLoaded) return;
      return await recentDropUsingGET({
        limit: 20,
        isTop,
      });
    },
    {
      refreshDeps: [isTop, pageLoaded],
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
    if (isTop) {
      setTopDropBox(recentBoxResult.data);
    }
  }, [recentBoxResult.data]);

  const handleDropData = (data: API.RecentDropVo[]) => {
    setRecentBox((prev) => {
      const newRecentBox: API.RecentDropVo[] = [...data, ...prev];
      const newRecentBoxSet = new Set();
      const newRecentBoxFilter = newRecentBox.filter((item) => {
        if (newRecentBoxSet.has(item.id)) {
          return false;
        }
        newRecentBoxSet.add(item.id);
        return true;
      });

      return newRecentBoxFilter.slice(0, 20);
    });
    setTopDropBox((prev) => {
      const filterData = data.filter(
        (item) => item.grade === 1 || item.grade === 0,
      );
      const newTopDropBox: API.RecentDropVo[] = [...filterData, ...prev];
      const newTopDropBoxSet = new Set();
      const newTopDropBoxFilter = newTopDropBox.filter((item) => {
        if (newTopDropBoxSet.has(item.id)) {
          return false;
        }
        newTopDropBoxSet.add(item.id);
        return true;
      });

      return newTopDropBoxFilter.slice(0, 20);
    });
  };

  const parseWsResult = (result: string) => {
    try {
      const data: { eventType: WsEventType; data: any } = JSON.parse(result);
      if (data.data) {
        addImgHost(data.data);
      }
      switch (data.eventType) {
        case WsEventType.CASE_DROP:
          handleDropData(data.data);
          break;
        case WsEventType.BATTLE_DROP:
          handleDropData(data.data);
          break;
        case WsEventType.UPGRADE_DROP:
          handleDropData(data.data);
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
    if (!pageLoaded) {
      return;
    }
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
  }, [pageLoaded]);

  return {
    recentBox,
    topDropBox,
    battleRoomCreate,
    battleState,
    battleRank,
    setIsTop,
    setPageLoaded,
    isTop,
  };
};
