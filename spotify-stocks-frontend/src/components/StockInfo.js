import React from 'react';


class StockInfo extends React.Component {


  render(){
    return (
      <React.Fragment>
        Name: {this.props.stockName}
          <br/>
        Opening Price: ${(parseFloat(this.props.openingPrice)).toFixed(2)}
          <br/>
        Current Price: ${(parseFloat(this.props.latestPrice)).toFixed(2)}
      </React.Fragment>
    )
  }
}

export default StockInfo;
