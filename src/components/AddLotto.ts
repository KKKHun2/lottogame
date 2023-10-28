// export {AddLotto};

// const axios = require('axios');
// const fs = require('fs');

// const lottoDrawNo = 100; 

// const apiUrl = `http://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${lottoDrawNo}`;


// async function AddLotto() {
//   try {
//     const response = await axios.get(apiUrl);
//     const lottoData = response.data; 

//     const winningNumbers = [];
//     for (let i = 1; i <= 6; i++) {
//       winningNumbers.push(lottoData[`drwtNo${i}`]);
//     }

//     const dataToAppend = `export const lottoData = [..., [${winningNumbers.join(', ')}]];\n`; // 기존 데이터에 winningNumbers 추가
//     fs.appendFile('data.ts', dataToAppend,(err: NodeJS.ErrnoException | null) => {
//       if (err) {
//         console.error('데이터를 추가하는 중 오류 발생:', err);
//       } else {
//         console.log('로또 번호 데이터가 추가되었습니다.');
//       }
//     });
//   } catch (error) {
//     console.error('API 호출 중 오류 발생:', error);
//   }
// }

// AddLotto();
