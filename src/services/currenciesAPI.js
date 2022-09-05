const requestCurrencies = async () => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await request.json();
  return json;
};

export default requestCurrencies;
