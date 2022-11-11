import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

interface IState {
  currencies: Record<string, string>;
  userCurrency: string;
  convertToCurrency: string;
  convertToAmount: string;
  convertToResult: string;
}

const initialState: IState = {
  currencies: {},
  userCurrency: '',
  convertToCurrency: '',
  convertToAmount: '',
  convertToResult: '',
};

export const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setCurrencies: (
      state,
      { payload }: PayloadAction<IState['currencies']>,
    ) => {
      state.currencies = payload;
    },
    setUserCurrency: (
      state,
      { payload }: PayloadAction<IState['userCurrency']>,
    ) => {
      state.userCurrency = payload;
    },
    setConvertToCurrency: (
      state,
      { payload }: PayloadAction<IState['convertToCurrency']>,
    ) => {
      state.convertToCurrency = payload;
    },
    setConvertToAmount: (
      state,
      { payload }: PayloadAction<IState['convertToAmount']>,
    ) => {
      state.convertToAmount = payload;
    },
    setConvertToResult: (
      state,
      { payload }: PayloadAction<IState['convertToResult']>,
    ) => {
      state.convertToResult = payload;
    },
  },
});

export const {
  setCurrencies,
  setUserCurrency,
  setConvertToCurrency,
  setConvertToAmount,
  setConvertToResult,
} = slice.actions;

export const store = configureStore({
  reducer: { slice: slice.reducer },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
