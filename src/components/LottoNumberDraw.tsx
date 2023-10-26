import React, { useState } from 'react';
import { lottoData } from '../data/data';
import styled from 'styled-components';
import { BsCircleFill } from 'react-icons/bs';

const Container = styled.div`
  text-align: center;
  background-color: #00a8ff;
  padding: 20px;
  border-radius: 10px;
`;

const Button = styled.button`
  background-color: #f5f6fa;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
`;

const RecommendedNumbersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const RecommendedNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #f5f6fa;
  border: 2px solid #00a8ff;
  border-radius: 50%;
  margin: 5px;
  font-size: 20px;
`;

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
    uniqueRandomNumbers.sort((a, b) => a - b);

    setRecommendedNumbers(uniqueRandomNumbers);
  };

  return (
    <Container>
      <h1>로또 번호 추천기</h1>
      <Button onClick={generateRandomNumbers}>번호 추천</Button>
      <RecommendedNumbersContainer>
        {recommendedNumbers.map((number, index) => (
          <RecommendedNumber key={index}>
            <BsCircleFill />
            {number}
          </RecommendedNumber>
        ))}
      </RecommendedNumbersContainer>
    </Container>
  );
};

export default LottoNumberDraw;
