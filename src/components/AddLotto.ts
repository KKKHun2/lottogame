import axios from 'axios';
import fs from 'fs';

let currentDrawNo: number = 1090;
let lastExecutionDate: Date = new Date();

function checkAndAddLotto() {
  const now: Date = new Date();

  if (now.getTime() - lastExecutionDate.getTime() >= 7 * 24 * 60 * 60 * 1000) {
    AddLotto(currentDrawNo);
    currentDrawNo++;
    lastExecutionDate = now;
  }
}

async function AddLotto(drawNo: number) {
  const apiUrl: string = `http://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drawNo}`;
  try {
    const response = await axios.get(apiUrl);
    const lottoData = response.data;

    const winningNumbers = [];
    for (let i = 1; i <= 6; i++) {
      winningNumbers.push(lottoData[`drwtNo${i}`]);
    }

    const dataToAppend = `export const lottoData = [..., [${winningNumbers.join(', ')}]];\n`;
    fs.appendFile('data.ts', dataToAppend, (err) => {
      if (err) {
        console.error('데이터를 추가하는 중 오류 발생:', err);
      } else {
        console.log(`로또 번호 데이터가 추가되었습니다. (회차: ${drawNo})`);
      }
    });
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
  }
}
setInterval(checkAndAddLotto, 60 * 60 * 10000);
checkAndAddLotto();
