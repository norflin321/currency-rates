import { CircularProgress } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getRates } from '../utils/api';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {
  setUserCurrency,
  useAppDispatch,
  useAppSelector,
} from '../utils/store';

const tableContainerStyle = {
  overflow: 'scroll',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  padding: '20px 50px',
  height: 350,
  borderRadius: 4,
};
const tableHeadStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 50px',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: 4,
};

export const Table: React.FC = () => {
  const dispatch = useAppDispatch();
  const userCurrency = useAppSelector((state) => state.slice.userCurrency);

  const [rates, setRates] = useState<{ currency: string; rate: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    if (!userCurrency) return;
    setLoading(true);
    getRates(userCurrency)
      .then((res) => {
        if (!res?.success || !res?.rates) throw new Error();
        const arr = Object.keys(res.rates).map((key) => ({
          currency: key,
          rate: res.rates[key],
        }));
        setRates(arr);
      })
      .catch(() => setError('Ошибка при получении списка валют'))
      .finally(() => setLoading(false));
  }, [userCurrency]);

  const sortedRates = useMemo(() => {
    const arr = [...rates];
    arr.sort((a, b) => {
      return sortAsc ? a.rate - b.rate : b.rate - a.rate;
    });
    return arr;
  }, [rates, sortAsc]);

  const onCurrencyClick = useCallback((e: any) => {
    dispatch(setUserCurrency(e.target.innerText));
  }, []);

  if (!userCurrency) return null;

  return (
    <>
      {loading ? (
        <div style={{ marginTop: 30, textAlign: 'center' }}>
          <CircularProgress size={25} />
        </div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <>
          <div style={tableHeadStyle}>
            <div>ВАЛЮТА</div>
            <div
              style={{ display: 'flex', cursor: 'pointer' }}
              onClick={() => setSortAsc((s) => !s)}
            >
              КУРС
              {sortAsc ? (
                <ArrowUpwardIcon fontSize="small" />
              ) : (
                <ArrowDownwardIcon fontSize="small" />
              )}
            </div>
          </div>
          <div style={tableContainerStyle}>
            <table style={{ width: '100%', textAlign: 'left' }}>
              {sortedRates.map((item) => (
                <tr key={item.currency}>
                  <td>
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={onCurrencyClick}
                    >
                      {item.currency}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', paddingBottom: 5 }}>
                    {item.rate}
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </>
      )}
    </>
  );
};
