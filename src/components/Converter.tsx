import { CircularProgress, FormControl, TextField } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { convertCurrency } from '../utils/api';
import {
  setConvertToAmount,
  setConvertToCurrency,
  setConvertToResult,
  useAppDispatch,
  useAppSelector,
} from '../utils/store';
import { CurrencySelect } from './CurrencySelect';

export const Converter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userCurrency, convertToCurrency, convertToAmount, convertToResult } =
    useAppSelector((state) => state.slice);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const convertCurrencyCb = useCallback(() => {
    if (!userCurrency || !convertToCurrency || !convertToAmount) return;
    if (Number(convertToAmount) <= 0) return;
    setLoading(true);
    convertCurrency(userCurrency, convertToCurrency, convertToAmount)
      .then((res) => {
        if (!res?.success) throw new Error();
        dispatch(setConvertToResult(String(res?.result ?? '')));
      })
      .catch(() => setError('Ошибка конвертации валют'))
      .finally(() => setLoading(false));
  }, [userCurrency, convertToCurrency, convertToAmount]);

  // send convert req, when amount changes (with 2 sec debounce)
  const debounceTimer = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(convertCurrencyCb, 2000);
  }, [convertToAmount]);

  // send conevert req, when selected currencies changes
  useEffect(convertCurrencyCb, [userCurrency, convertToCurrency]);

  return (
    <>
      <CurrencySelect
        label="Валюта в которую хотите конвертировать"
        value={convertToCurrency}
        onChange={(value) => {
          dispatch(setConvertToCurrency(value));
        }}
      />
      <FormControl fullWidth>
        <TextField
          label="Сумма"
          id="outlined-number"
          type="number"
          style={{ marginTop: 30 }}
          value={convertToAmount}
          onChange={(event) => {
            dispatch(setConvertToAmount(event.target.value));
          }}
        />
        {loading ? (
          <div style={{ marginTop: 30 }}>
            <CircularProgress size={25} />
          </div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : (
          convertToResult && (
            <TextField
              label="Результат"
              id="outlined-number"
              value={convertToResult}
              style={{ marginTop: 30 }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
              disabled
            />
          )
        )}
      </FormControl>
    </>
  );
};
