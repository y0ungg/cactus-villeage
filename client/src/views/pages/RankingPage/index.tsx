import React from 'react';
import type { IRankings } from 'feature/ranking';
import { ShareTitle } from './RankingsPage.style';
import { Title } from 'views/components/UI/molecules/text.style';
import { Layout } from 'views/components/UI/Layout.style';
import TwitterShare from './TwitterShare';
import StampList from './StampList';
import MyPageNav from 'views/components/common/MyPageNav';
import Rankers from './Rankers';
import useRankingPage from './useRankingPage';
import useSelectorTyped from 'utils/useSelectorTyped';
import KakaoShare from './KakaoShare';

const MypageRanking = () => {
  void useRankingPage();
  const { requestStatus, myStamps }: Partial<IRankings> = useSelectorTyped(state =>
    state.rankingReducer);

  return (
    <Layout.PageContainer>
      <MyPageNav />
      <Title.Main>실시간 도장 랭킹 확인하기</Title.Main>
      <Rankers />
      <ShareTitle>
        <Title.Sub>나의 도장 모음</Title.Sub>
        <div>
          <KakaoShare stampsCount={myStamps.length} />
          <TwitterShare stampsCount={myStamps.length} />
          으로 자랑하기✨
        </div>
      </ShareTitle>
      {requestStatus}
      {myStamps.length > 0
        ? <StampList myStamps={myStamps} />
        : null}
    </Layout.PageContainer>
  );
};

export default MypageRanking;
