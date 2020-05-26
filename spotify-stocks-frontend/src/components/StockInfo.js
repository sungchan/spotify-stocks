import React from 'react';


class StockInfo extends React.Component {


  render(){
    return (
      <React.Fragment>
        Opening Price: {this.props.openingPrice}<br/>
        Current Price: {this.props.latestPrice}
        Name: {this.props.stockName}
      </React.Fragment>
    )
  }
}

export default StockInfo;
