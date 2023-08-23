import Banner from './banner';
import Case from './case';
import Giveaways from './giveaways';
import './index.less';
import TopIcons from './topIcons';

export default function Home() {
  return (
    <>
      <Banner />
      <TopIcons />
      <Giveaways />
      <Case />
    </>
  );
}
