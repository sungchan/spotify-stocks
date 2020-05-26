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
          loading={this.props.isLoading}
          onSearchChange={this.props.handleSearchChange}
          resultRenderer = {resultRenderer}
          value={this.props.symbol}
          results={this.props.results}
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
          handlePurchaseQuantity={this.props.handlePurchaseQuantity}
        />
      </React.Fragment>
    )
  }
}

export default Portfolio;
