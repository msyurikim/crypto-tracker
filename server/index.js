const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
// const db = require('../database/index.js');

const app = express();
const PORT = 3000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

var prices = {
  buy: null,
  sell: null
};

var currencies = ['bitcoin', 'ethereum', 'ripple', 'bitcoin cash'];

app.get('/api/binance', (req, res) => {
  var binanceCurrencies = ['BTCUSDT', 'ETHUSDT', 'XRPUSDT', 'BCHUSDT'];
  var symbol = binanceCurrencies[currencies.indexOf(req.query.symbol)];
  axios.get('https://api.binance.com/api/v3/ticker/24hr', { params: { symbol: symbol } })
    .then((response) => {
      prices.buy = response.data.bidPrice;
      prices.sell = response.data.askPrice;
      res.send(prices);
    });
});

app.get('/api/coinbase', (req, res) => {
  var coinbaseCurrencies = ['BTC-USD', 'ETH-USD', 'XRP-USD', 'BCH-USD'];
  var symbol = coinbaseCurrencies[currencies.indexOf(req.query.symbol)];

  //multiple axios requests:
  var requestBuy = axios.get(`https://api.coinbase.com/v2/prices/${symbol}/buy`);
  var requestSell = axios.get(`https://api.coinbase.com/v2/prices/${symbol}/sell`);
  axios.all([requestBuy, requestSell]).then(axios.spread( (...responses) => {
    prices.buy = responses[0].data.data.amount;
    prices.sell = responses[1].data.data.amount;
    res.send(prices);
  })).catch(errors => {
    console.log(errors);
  });
});

app.get('/api/huobi', (req, res) => {
  var huobiCurrencies = ['btcusdt', 'ethusdt', 'xrpusdt', 'bchusdt'];
  var symbol = huobiCurrencies[currencies.indexOf(req.query.symbol)];
  axios.get('https://api.huobi.pro/market/detail/merged', { params: { symbol: symbol } })
    .then((response) => {
      prices.buy = response.data.tick.bid[0];
      prices.sell = response.data.tick.ask[0];
      res.send(prices);
    });
});

app.get('/api/bitfinex', (req, res) => {
  var bitfinexCurrencies = ['tBTCUSD', 'tETHUSD', 'tXRPUSD', 'tBABUSD'];
  var symbol = bitfinexCurrencies[currencies.indexOf(req.query.symbol)];
  axios.get(`https://api-pub.bitfinex.com/v2/ticker/${symbol}`)
    .then((response) => {
      prices.buy = response.data[0];
      prices.sell = response.data[2];
      res.send(prices);
    });
});

app.get('/api/bitstamp', (req, res) => {
  var bitstampCurrencies = ['btcusd', 'ethusd', 'xrpusd', 'bchusd'];
  var symbol = bitstampCurrencies[currencies.indexOf(req.query.symbol)];
  axios.get(`https://www.bitstamp.net/api/v2/ticker/${symbol}`)
    .then((response) => {
      prices.buy = response.data.bid;
      prices.sell = response.data.ask;
      res.send(prices);
    });
});

// app.get('/api/kraken', (req, res) => {
//   var krakenCurrencies = ['XBTUSD', 'ETHUSD', 'XRPUSD', 'BCHUSD'];
//   var symbol = krakenCurrencies[currencies.indexOf(req.query.symbol)];
//   axios.get('https://api.kraken.com/0/public/Ticker', { params: { pair: symbol } })
//     .then((response) => {
//       prices.buy = response.result[symbol];
//       prices.sell = response.data.askPrice;
//       res.send(prices);
//     });
// });

// app.get('/currencies', (req, res) => {
//   db.getAllCurrencies((err, results) => {
//     if (err) {
//       console.log(err);
//       res.sendStatus(404);
//     } else {
//       res.send(JSON.stringify(results));
//     }
//   });
// });

// app.get('/exchanges', (req, res) => {
//   db.getAllExchanges((err, results) => {
//     if (err) {
//       console.log(err);
//       res.sendStatus(404);
//     } else {
//       res.send(JSON.stringify(results));
//     }
//   });
// });

// app.post('/api/categories', (req, res) => {
//   db.postCategory([req.body.name, req.body.target],(err, results) => {
//     if (err) {
//       console.log(err);
//       res.sendStatus(404);
//     } else {
//       res.sendStatus(201);
//     }
//   });
// });

// app.post('/api/category', (req, res) => {
//   db.getCategory([req.body.name], (err, results) => {
//     if (err) {
//       console.log(err);
//       res.sendStatus(404);
//     } else {
//       res.send(JSON.stringify(results));
//     }
//   });
// });


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
