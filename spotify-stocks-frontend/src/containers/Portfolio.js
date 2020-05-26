import React from 'react';
import { Search, Button, Label } from 'semantic-ui-react';

import StockInfo from '../components/StockInfo.js';
import BuyStocks from '../components/BuyStocks.js';

const resultRenderer = ( data ) => {
  console.log(data['1. symbol'])
  return(
    <div>
      {data['1. symbol']} - {data['2. name']}
    </div>
  )
}

class Portfolio extends React.Component {


  render(){
    return (
      <React.Fragment>
        <Search
          placeholder={'Search by symbol or name'}
          resultRenderer = {resultRenderer}
          loading={this.props.isLoading}
          value={this.props.symbol}
          results={this.props.results}
          onSearchChange={this.props.handleSearchChange}
          onResultSelect={this.props.handleResultSelect}
        />
        <div>
          hello
        </div>
        <StockInfo
          openingPrice={this.props.openingPrice}
          stockName={this.props.stockName}
          latestPrice={this.props.latestPrice}
        />
          <br/>
        <BuyStocks
          purchaseQuantity={this.props.purchaseQuantity}
          latestPrice={this.props.latestPrice}
          balance={this.props.balance}
          totalPrice={this.props.totalPrice}
          enoughFunds={this.props.enoughFunds}
          totalQuantity={this.props.totalQuantity}
          symbol={this.props.symbol}

          handlePurchase={this.props.handlePurchase}
          handlePurchaseSubmit={this.props.handlePurchaseSubmit}
        />
      </React.Fragment>
    )
  }
}

export default Portfolio;
