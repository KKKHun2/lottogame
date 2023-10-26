import React, { useState } from 'react';
import { lottoData } from '../data/data'

const LottoNumberDraw: React.FC = () => {
    const [recommendedNumbers, setRecommendedNumbers] = useState<number[]>([]);

    const generateRandomNumbers = () => {
      const allNumbers = lottoData.flat();
      const uniqueRandomNumbers: number[] = [];
  
      while (uniqueRandomNumbers.length < 6) {
        const randomIndex = Math.floor(Math.random() * allNumbers.length);
        const randomNum = allNumbers[randomIndex];
  
        if (!uniqueRandomNumbers.includes(randomNum)) {
          uniqueRandomNumbers.push(randomNum);
        }
      }
  
      setRecommendedNumbers(uniqueRandomNumbers);
    };
  
    return (
      <div>
        <h1>로또 번호 추천기</h1>
        <button onClick={generateRandomNumbers}>번호 추천</button>
        <p>추천 번호: {recommendedNumbers.join(', ')}</p>
      </div>
    );
  };

export default LottoNumberDraw;
