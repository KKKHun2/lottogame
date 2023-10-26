import React from 'react';
import { lottoData } from '../data/data'

const LottoNumberDraw: React.FC = () => {
  const combineAndRecommendNumbers = () => {
    const allNumbers = lottoData.flat();

    const recommendedNumbers: number[] = [];

    while (recommendedNumbers.length < 6) {
      const randomIndex = Math.floor(Math.random() * allNumbers.length);
      recommendedNumbers.push(allNumbers[randomIndex]);
    }

    return recommendedNumbers;
  };

  const recommendedNumbers = combineAndRecommendNumbers();

  return (
    <div>
      <h1>로또 번호 추천기</h1>
      <p>추천 번호: {recommendedNumbers.join(', ')}</p>
    </div>
  );
};

export default LottoNumberDraw;
