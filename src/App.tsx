import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress from '@mui/material/CircularProgress';
import './App.css';
import { CurrencySelect } from './components/CurrencySelect';
import { getAvaliableCurrencies } from './utils/api';
import {
  useAppDispatch,
  setCurrencies,
  useAppSelector,
  setUserCurrency,
} from './utils/store';
import { Converter } from './components/Converter';
import { Table } from './components/Table';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const dispatch = useAppDispatch();
  const userCurrency = useAppSelector((state) => state.slice.userCurrency);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState(0);

  // load avaliable currencies and save them to store
  useEffect(() => {
    setLoading(true);
    getAvaliableCurrencies()
      .then((res) => {
        if (!res?.success) throw new Error();
        dispatch(setCurrencies(res.symbols));
      })
      .catch(() => setError('Ошибка при загрузке доступных валют'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="App">
      <Container maxWidth="sm">
        <Card variant="outlined" style={{ padding: '50px 60px', height: 600 }}>
          {loading ? (
            <div
              style={{
                height: '-webkit-fill-available',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </div>
          ) : error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : (
            <>
              <CurrencySelect
                label="Ваша валюта"
                value={userCurrency}
                onChange={(value) => {
                  dispatch(setUserCurrency(value));
                }}
              />
              <Tabs
                value={tab}
                onChange={(_, newValue: number) => setTab(newValue)}
                variant="fullWidth"
                style={{ marginTop: 40 }}
              >
                <Tab label="Конвертер" {...a11yProps(0)} />
                <Tab label="Таблица курсов" {...a11yProps(1)} />
              </Tabs>
              <div style={{ marginTop: 35 }}>
                <div style={{ display: tab === 0 ? 'initial' : 'none' }}>
                  <Converter />
                </div>
                <div style={{ display: tab === 1 ? 'initial' : 'none' }}>
                  <Table />
                </div>
              </div>
            </>
          )}
        </Card>
      </Container>
    </div>
  );
}

export default App;
