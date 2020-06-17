import React from 'react';

class ExchangeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exchange: 'binance'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      exchange: event.target.value
    });
  }

  handleSubmit(event) {
    this.props.addExchange(this.state.exchange);
  }

  render() {
    return (
      <div>
        <h3>Crypto-currency Exchanges</h3>
        <form onSubmit={this.handleSubmit}>
          <select id="exchangeList" value={this.state.exchange} onChange={this.handleChange}>
            <option value="binance">binance</option>
            <option value="bitfinex">bitfinex</option>
            <option value="bitstamp">bitstamp</option>
            <option value="coinbase">coinbase</option>
            <option value="huobi">huobi</option>
          </select>
          <input type="submit" value="Add" />
        </form>
        {this.props.getAllExchanges().map( (exchange) => {
          return <div>{exchange}</div>;
        })}
      </div>
    );
  }
}

export default ExchangeList;