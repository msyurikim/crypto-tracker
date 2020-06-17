import React from 'react';

class CurrencyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'bitcoin'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      currency: event.target.value
    });
  }

  handleSubmit(event) {
    this.props.addCurrency(this.state.currency);
  }

  render() {
    return (
      <div>
        <h3>Crypto-currencies</h3>
        <form onSubmit={this.handleSubmit}>
          {/* <label for="currencyList">Crypto-currencies</label> */}
          <select id="currencyList" value={this.state.currency} onChange={this.handleChange}>
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="ripple">Ripple</option>
            <option value="bitcoin cash">Bitcoin Cash</option>
          </select>
          <input type="submit" value="Add" />
        </form>
        {this.props.getAllCurrencies().map( (currency) => {
          return <div>{currency}</div>;
        })}
      </div>
    );
  }
}

export default CurrencyList;