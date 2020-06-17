import React from 'react';
import $ from 'jquery';

import List from './List.jsx';
import CurrencyList from './CurrencyList.jsx';
import ExchangeList from './ExchangeList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // exchanges: ['binance', 'bitfinex', 'bitstamp', 'coinbase', 'huobi']
      currencies: [],
      exchanges: []
    };
    this.getAllCurrencies = this.getAllCurrencies.bind(this);
    this.getAllExchanges = this.getAllExchanges.bind(this);
    this.addCurrency = this.addCurrency.bind(this);
    this.addExchange = this.addExchange.bind(this);
  }

  componentDidMount() {
    this.getAllCurrencies();
    this.getAllExchanges();
  }

  addCurrency(currency) {
    if (!this.getAllCurrencies().includes(currency)) {
      this.setState({
        currencies: [...this.state.currencies, currency]
      });
    }
    //preventDefault is called on the event when submitting the form to prevent a browser reload/refresh
    event.preventDefault();
  }

  addExchange(exchange) {
    if (!this.getAllExchanges().includes(exchange)) {
      this.setState({
        exchanges: [...this.state.exchanges, exchange]
      });
    }
    event.preventDefault();
  }

  getAllCurrencies() {  // from database
    // $.get('/currencies')
    //   .done( (data) => {
    //     console.log(data);
    //     // var result = JSON.parse(data);
    //     this.setState({
    //       currencies: data
    //     });
    //   });
    return this.state.currencies;
  }

  getAllExchanges() {
    // $.get('/exchanges')
    //   .done( (data) => {
    //     console.log(data);
    //     // var result = JSON.parse(data);
    //     this.setState({
    //       exchanges: data
    //     });
    //   });
    return this.state.exchanges;
  }

  render() {
    return (
      <div>
        <List exchanges={this.state.exchanges} currencies={this.state.currencies} />
        <CurrencyList currencies={this.state.currencies} getAllCurrencies={this.getAllCurrencies} addCurrency={this.addCurrency} />
        <ExchangeList exchanges={this.state.exchanges} getAllExchanges={this.getAllExchanges} addExchange={this.addExchange} />
      </div>
    );
  }
};

export default App;