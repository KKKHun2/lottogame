import React, { useEffect, useState } from 'react';
import { reducedLottoNumbers } from '../data/data';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  text-align: center;
  background-color: #00a8ff;
  padding: 20px;
  height: 100vh;
  border-radius: 10px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 60px;
  font-weight: 700;
  @media (max-width: 900px) {
    font-size: 40px;
    margin-top:100px;
  }
`;
const UserName = styled.div`
  font-size: 25px;  
  font-weight: 500;
  margin-bottom:50px;
`;
const Button = styled.button`
  background-color: #f5f6fa;
  border: none;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 80px;
  transition: all 0.3s ease; 
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: #a2a2a2;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4); 
  }
`;


const RecommendedNumbersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 300px;
`;

const RecommendedNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: #f5f6fa;
  border: 2px solid #00a8ff;
  border-radius: 50%;
  margin: 10px;
  font-size: 20px;
  box-shadow:0 10px 10px rgba(0, 0, 0, 0.4); 
  cursor:pointer;
  &:hover{
    background-color: #e3f767;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4); 
  }
  @media (max-width: 900px) {
    margin:20px;
  }
`;


const LottoN = styled.div`
    font-size:35px;
    font-weight: 450;
`
const LottoNumberDraw: React.FC = () => {
    const [recommendedNumbers, setRecommendedNumbers] = useState<number[]>([]);
    const [userName, setUserName] = useState<string | null>(null);
  
    useEffect(() => {
      const savedName = localStorage.getItem('userName');
      if (savedName) {
        setUserName(savedName);
      }
    }, []);
  
    const handleNameChange = () => {
      const inputName = prompt('이름을 입력하세요:');
      if (inputName) {
        setUserName(inputName);
        localStorage.setItem('userName', inputName);
      }
    };
  
    const generateRandomNumbers = () => {
      const allNumbers = reducedLottoNumbers.flat();
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
        <Title>로또 번호 추천기</Title>
        {userName ? (
          <UserName>안녕하세요, {userName} 님!</UserName>
        ) : (
          <Button onClick={handleNameChange}>이름 입력</Button>
        )}
        {userName && (
          <Button onClick={generateRandomNumbers}>번호 추천</Button>
        )}
        <RecommendedNumbersContainer>
          {recommendedNumbers.map((number, index) => (
            <RecommendedNumber key={index}>
              <LottoN>{number}</LottoN>
            </RecommendedNumber>
          ))}
        </RecommendedNumbersContainer>
      </Container>
    );
  };
  
  export default LottoNumberDraw;