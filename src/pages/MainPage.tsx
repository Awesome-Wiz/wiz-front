import { useEffect, useState } from 'react';
import MainGameSchedule from '../assets/main-game-schedule.png'
import DoosanBearsLogo from '../assets/DoosanBearsLogo.png'
import KtWizLogo from '../assets/KtWizLogo.png'
import { GameInfo } from '../types/types';
import { api } from '../api/api'

const MainPage = () => {
  const [currentGame, setCurrentGame] = useState<GameInfo | null>(null);
  const [prevGame, setPrevGame] = useState<GameInfo | null>(null);
  const [nextGame, setNextGame] = useState<GameInfo | null>(null);
  const [displayedGame, setDisplayedGame] = useState<GameInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setLoading(true);
    api.getRecentGame()
    .then((data) => {
      setCurrentGame(data.current);
      setPrevGame(data.prev);
      setNextGame(data.next);
      setDisplayedGame(data.current);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, []);
  
  if (!currentGame) {
    return <div>현재 게임에 대한 정보가 없습니다.</div>; 
  }

  if (!displayedGame) {
    return <div>출력되는게임에 대한 정보가 없습니다.</div>; 
  }

  // prev 버튼 핸들러
  const handlePrevClick = () => {
    if (displayedGame === currentGame && prevGame) {
      setDisplayedGame(prevGame); // prevGame으로 변경
    } else if (displayedGame === nextGame && currentGame) {
      setDisplayedGame(currentGame); // nextGame에서 currentGame으로 변경
    }
  };

  // next 버튼 핸들러
  const handleNextClick = () => {
    if (displayedGame === currentGame && nextGame) {
      setDisplayedGame(nextGame); // currentGame에서 nextGame으로 변경
    } else if (displayedGame === prevGame && currentGame) {
      setDisplayedGame(currentGame); // prevGame에서 currentGame으로 변경
    }
  };

  return (
    // GAME SCHEDULE SECTION CONTAINER
    <div className="flex flex-col items-center">
      {/* GAME SCHEDULE IMAGE */}
      <div className="w-[51.625em] h-[6.5625em] relative overflow-hidden">
        <img src={MainGameSchedule} alt="game-schedule-image" />
      </div>
      {/* GAME SCHEDULE CONTENT CONTAINER */}
      <div  className="flex flex-row w-[68.75em] h-[18.875em] px-[3.125em] py-[2.5em] mb-[5em] rounded-[1.25em] shadow-[0_30px_30px_-10px_rgba(245,50,50,.3)] ">
        {/* GAME INFO CARD CONTAINER */}
        <div className="w-[37.8125em] h-[13.875em] pr-[1.25em]">
        {/* GAME INFO CARD HEADER */}
          <div className='flex flex-row justify-between items-center text-3xl border-b-[0.0625em]'>
            <img 
              src="https://www.ktwiz.co.kr/v2/imgs/ico-24-navi-prev.svg" 
              alt="prev"
              onClick={handlePrevClick}
              className='cursor-pointer'
            />
              {/* GAME INFO CARD HEADER CENTER */}
              <div className='text-sm flex flex-col items-center w-full font-sans'>
                {/* DISPLAYED GAME DATE */}
                <div className='noto text-[1.25em] font-bold mb-[0.625em] text-[#35383e]'>
                  {`${displayedGame.gyear}.${displayedGame.gmonth}.${displayedGame.gday}`}
                </div>
                {/* DISPLAYED GAME LOCATION & TIME */}
                <div className='noto text-[0.875rem] text-[#717781]'>
                  {`${displayedGame.stadium} ${displayedGame.gtime}`}
                </div>
              </div>
            <img 
              src="https://www.ktwiz.co.kr/v2/imgs/ico-24-navi-next.svg" 
              alt="next"
              onClick={handleNextClick}
              className='cursor-pointer'
            />
          </div>
          {/* GAME INFO CARD BODY */}
          <div className=' pt-[1.125em] w-[36.5625em] h-[9.375em] flex flex-row justify-between items-'>
            {/* TEAM1 */}
            <div className='noto w-[10em] h-[8.25em] box-border flex flex-col items-center justify-center font-bold'>
              {/* TEAM1 EMBLEM */}
              <div className='w-[6.25em] h-[6.25em]'>
                <img src={DoosanBearsLogo} alt="DoosanBearsLogo" />
              </div>
              {/* TEAM1 NAME */}
              {displayedGame.matchTeamName}
            </div>
            {/* CENTER */}
            <div className='w-[16.5625em] h-[8.25em] box-border flex flex-col items-center justify-center'>
              {/* SCORE */}
              <div>
                <span className='inline-block w-[108px] h-[94px] text-center text-[4em] font-bold'>
                  {displayedGame.visitScore ?? '-'}
                </span>
                <span className='inline-block text-[3.125em]'>
                  :
                </span>
                <span className='inline-block w-[108px] h-[94px] text-center text-[4em] font-bold'>
                  {displayedGame.homeScore ?? '-'}
                </span>
              </div>
              {/* GAME DETAIL BUTTON */}
              <div>
                <button className='flex flex-row'>
                  경기정보
                  <img src="https://www.ktwiz.co.kr/v2/imgs/ico-18-navi-next.svg" alt="nextArrow" />
                </button>
              </div>
            </div>
            {/* TEAM2 */}
            <div className='noto w-[10em] h-[8.25em] box-border flex flex-col items-center justify-center font-bold'>
              {/* TEAM2 EMBLEM */}
              <div className='w-[6.25em] h-[6.25em]'>
                <img src={KtWizLogo} alt="KtWizLogo" />
              </div>
              {/* TEAM2 NAME */}
              {displayedGame.home}
            </div>
          </div>
        </div>
        {/* VIDEO CONTAINER */}
        <div className="w-[24.6875em] h-[13.875em] bg-blue-300"> 
          비디오 부분
        </div>
      </div>
    </div>
  );
}
export default MainPage