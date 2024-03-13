import axios from 'axios';
import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil'; 
import styled from 'styled-components';
import { lottoDataState, lottoNumbersState } from '../atoms/atoms';


const Button = styled.button`
  background-color: #f5f6fa;
  border: none;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  &:hover, &:active { 
    background-color: #a2a2a2;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
  }
`;

  const LottoDataUpdater = () => {
  const [lottoData, setLottoData] = useRecoilState(lottoDataState);
  const setLottoNumbers = useSetRecoilState(lottoNumbersState); 
  const [startDrawNo, setStartDrawNo] = useState(1108); // 초기 회차 설정

  const handleAddLotto = async () => {
    try {
      await AddLotto(startDrawNo, lottoData, setLottoData, setLottoNumbers);
      setStartDrawNo(prevDrawNo => prevDrawNo + 1); // 다음 회차로 설정
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };

  return (
    <>
    <Button onClick={handleAddLotto}>{startDrawNo}회차 번호 추가하기</Button>
    </>
  );
};

async function AddLotto(
  drawNo: number,
  lottoData: number[][],
  setLottoData: (data: number[][]) => void,
  setLottoNumbers: (numbers: number[][]) => void
) {
  const apiUrlPrefix = 'https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=';
  const apiUrl = `${apiUrlPrefix}${drawNo}`;

  console.log(apiUrl)
  const response = await axios.get(apiUrl);
  console.log(response)
  const lottoDataResponse = response.data;
  console.log(lottoDataResponse)


  // 에러 처리
  if (!lottoDataResponse) {
    throw new Error(`로또 데이터를 가져오지 못했습니다. (회차: ${drawNo})`);
  }
console.log(lottoDataResponse)
  // 이미 존재하는 회차인지 확인
  if (lottoData.some(data => data[0] === drawNo)) {
    console.log(`로또 데이터 (회차: ${drawNo}) 이미 존재합니다.`);
    return;
  }

  const winningNumbers = [];
  for (let i = 1; i <= 6; i++) {
    winningNumbers.push(lottoDataResponse[`drwtNo${i}`]);
  }

  const newLottoData = [...lottoData, winningNumbers];

  setLottoData(newLottoData);
  setLottoNumbers(newLottoData); 

  console.log(`로또 번호 데이터가 추가되었습니다. (회차: ${drawNo})`);
}


export default LottoDataUpdater;