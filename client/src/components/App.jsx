import React from 'react';
import $ from 'jquery';

import List from './List.jsx';
import CurrencyList from './CurrencyList.jsx';
import ExchangeList from './ExchangeList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      exchanges: []
    };
    this.getAllCurrencies = this.getAllCurrencies.bind(this);
    this.getAllExchanges = this.getAllExchanges.bind(this);
  }

  componentDidMount() {
    // this.getAllCurrencies();
    // this.getAllExchanges();
  }

  getAllCurrencies() {  // from database
    $.get('/currencies')
      .done( (data) => {
        console.log(data);
        // var result = JSON.parse(data);
        this.setState({
          currencies: data
        });
      });
  }

  getAllExchanges() {
    $.get('/exchanges')
      .done( (data) => {
        console.log(data);
        // var result = JSON.parse(data);
        this.setState({
          exchanges: data
        });
      });
  }

  render() {
    return (
      <div>
        <List />
        <CurrencyList currencies={this.state.currencies} getAllCurrencies={this.getAllCurrencies} />
        <ExchangeList exchanges={this.state.exchanges} getAllExchanges={this.getAllExchanges} />
      </div>
    );
  }
};

export default App;