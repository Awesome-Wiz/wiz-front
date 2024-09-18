import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { TGamePitcherRank } from "../../types/types";
import GamePlayerRankingTop from "../../components/rank/GamePlayerRankingTop";

const PitcherRanking = () => {
  const [eraTop3, setEraTop3] = useState<TGamePitcherRank>([]);
  const [winTop3, setWinTop3] = useState<TGamePitcherRank>([]);
  const [eraTop5, setEraTop5] = useState<TGamePitcherRank>([]);
  const [error, setError] = useState<string | null>(null);

  if (error) {
    <div>error..!</div>;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 평균자책점 TOP3
        const eraTop3Data = await api.getGamePitcherEraTop3();
        // 승리 TOP3
        const winTop3Data = await api.getGamePitcherWinTop3();
        // 평균자책점 TOP5
        const eraTop5Data = await api.getGameAllPitcherEraTop5();
        setEraTop3(eraTop3Data ?? []);
        setWinTop3(winTop3Data ?? []);
        setEraTop5(eraTop5Data ?? []);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("알 수 없는 에러 발생");
        }
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        {/* PITCHER TOP PART CONTAINER*/}
        <GamePlayerRankingTop
          playerDataType="pitcher"
          eraTop3={eraTop3}
          winTop3={winTop3}
          eraTop5={eraTop5}
        />
        {/* PITCHER BOTTOM PART CONTAINER*/}
        {/* BOTTOM PART HEADER CONTAINER */}
        <div>
          {/* KT/ALL TAB */}
          {/* SEARCH BAR */}
          {/* SEASON FILTER */}
        </div>
        {/* TABLE */}
      </div>
    </>
  );
};
export default PitcherRanking;
