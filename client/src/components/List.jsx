import React from 'react';
import $ from 'jquery';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      binance: {},
      coinbase: {},
      huobi: {},
      kraken: {},
      bitfinex: {},
      bitstamp: {},
      exchanges: [],
      currencies: []
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.exchanges != prevProps.exchanges || this.props.currencies != prevProps.currencies){
     this.setState({
      exchanges: this.props.exchanges,
      currencies: this.props.currencies
     });
     this.getPrices();
    }
  }

  getPrices() {
    this.props.exchanges.forEach((exchange) => {
      this.props.currencies.forEach((currency) => {
        $.get(`/api/${exchange}`, { symbol: currency })
          .done((data) => {
            var exchangeCopy = JSON.parse(JSON.stringify(this.state[exchange]));
            exchangeCopy[currency] = data;
            this.setState({
              [exchange]: exchangeCopy
            });
          });
      });
    });
  }

  render() {
    return (
      <div>
        <h3>Current Prices</h3>
        {console.log(this.state)}
      </div>
    );
  }
}

export default List;