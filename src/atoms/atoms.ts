// atoms.ts
import { atom } from 'recoil';

export const userNameState = atom<string | null>({
  key: 'userNameState',
  default: localStorage.getItem('userName') || null,
});

export const recommendedNumbersState = atom<number[]>({
  key: 'recommendedNumbersState',
  default: [],
});

export const lottoDataState = atom<number[][]>({
  key: 'lottoDataState',
  default: [],
});
