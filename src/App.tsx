import React from 'react';
import LottoNumberDraw from './components/LottoNumberDraw';
import { AddLotto } from './components/AddLotto';


function App() {
  AddLotto()
  return (
    <div className="App">
      <LottoNumberDraw />
    </div>
  );
}

export default App;
