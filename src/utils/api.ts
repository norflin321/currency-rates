// 0tUimIJXTaVIR4Ejn4TciJoCkyzZbCzx - 60/100 requests per month used

// 15/100 requests per month used
const API_KEY = 'TF1QxpnUHRu4mj3T2a0YQq6R5e6nTTxX';
const BASE_URL = 'https://api.apilayer.com';

const myHeaders = new Headers();
myHeaders.append('apikey', API_KEY);

const requestOptions: any = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders,
};

export const getAvaliableCurrencies = async () => {
  return fetch(`${BASE_URL}/fixer/symbols`, requestOptions).then((response) =>
    response.json(),
  );
};

export const convertCurrency = async (
  from: string,
  to: string,
  amount: string,
) => {
  return fetch(
    `${BASE_URL}/fixer/convert?from=${from}&to=${to}&amount=${amount}`,
    requestOptions,
  ).then((response) => response.json());
};

export const getRates = async (baseCurrency: string) => {
  return fetch(
    `${BASE_URL}/fixer/latest?base=${baseCurrency}`,
    requestOptions,
  ).then((response) => response.json());
};
