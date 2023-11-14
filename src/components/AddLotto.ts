import axios from 'axios';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil'; 
import { lottoDataState, lottoNumbersState } from '../atoms/atoms';

let currentDrawNo: number = 1090;
let lastExecutionDate: Date = new Date();

async function checkAndAddLotto(
  lottoData: number[][],
  setLottoData: (data: number[][]) => void,
  setLottoNumbers: (numbers: number[][]) => void
) {
  const now: Date = new Date();

  if (now.getTime() - lastExecutionDate.getTime() >= 7 * 24 * 60 * 60 * 1000) {
    await AddLotto(currentDrawNo, lottoData, setLottoData, setLottoNumbers);
    currentDrawNo++;
    lastExecutionDate = now;
  }
}

async function AddLotto(
  drawNo: number,
  lottoData: number[][],
  setLottoData: (data: number[][]) => void,
  setLottoNumbers: (numbers: number[][]) => void
) {
  const apiUrl: string = `http://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drawNo}`;
  try {
    const response = await axios.get(apiUrl);
    const lottoDataResponse = response.data;

    const winningNumbers = [];
    for (let i = 1; i <= 6; i++) {
      winningNumbers.push(lottoDataResponse[`drwtNo${i}`]);
    }

    const newLottoData = [...lottoData, winningNumbers];

    setLottoData(newLottoData);
    setLottoNumbers(newLottoData); 

    console.log(`로또 번호 데이터가 추가되었습니다. (회차: ${drawNo})`);
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
  }
}

const LottoDataUpdater = () => {
  const [lottoData, setLottoData] = useRecoilState(lottoDataState);
  const setLottoNumbers = useSetRecoilState(lottoNumbersState); 

  useEffect(() => {
    const timer = setInterval(() => {
      checkAndAddLotto(lottoData, setLottoData, setLottoNumbers);
    }, 60 * 60 * 10000);
  
    checkAndAddLotto(lottoData, setLottoData, setLottoNumbers);
  
    return () => {
      clearInterval(timer);
    };
  }, []);

  return null;
};

export default LottoDataUpdater;
