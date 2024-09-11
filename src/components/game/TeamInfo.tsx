import React from 'react';

interface TeamInfoProps {
  teamName: string;
  teamLogo: string;
}

const TeamInfo: React.FC<TeamInfoProps> = ({ teamName, teamLogo }) => {  
  return (
    <div className='notokr w-[10em] h-[8.25em] box-border flex flex-col items-center justify-center font-bold'>

      {/* 팀 로고 */}
      <div className='w-[6.25em] h-[6.25em]'>
        <img src={teamLogo} alt={`${teamName} Logo`} />
      </div>

      {/* 팀 이름 */}
      {teamName}
      
    </div>
  );
};

export default React.memo(TeamInfo);
