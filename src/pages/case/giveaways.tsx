import { listHostGiveawayUsingGET } from '@/services/front/ROLLfangxiangguan';
import { useRequest } from '@umijs/max';

export default function Giveaways () {
  const { data: giveawayList } = useRequest(() => listHostGiveawayUsingGET());
  console.log('giveawayList', giveawayList);
  return <div>123</div>;
};
