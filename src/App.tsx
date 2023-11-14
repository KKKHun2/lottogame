import React from 'react';
import LottoNumberDraw from './components/LottoNumberDraw';
import { RecoilRoot } from 'recoil';
import LottoDataUpdater from './components/AddLotto';

function App() {


  return (
    <RecoilRoot>
      <LottoNumberDraw />
      <LottoDataUpdater />
    </RecoilRoot>
  );
}

export default App;
