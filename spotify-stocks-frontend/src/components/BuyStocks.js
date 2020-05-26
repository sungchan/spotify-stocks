import React from 'react';
import { Input, Button } from 'semantic-ui-react'



class BuyStocks extends React.Component {


  render(){
    return (
      <React.Fragment>
        <Input placeholder={'How many stocks you want?'} value={this.props.purchaseQuantity} onChange={this.props.handlePurchaseQuantity}/>

        <Button content={'Purchase'}/>
      </React.Fragment>
    )
  }
}

export default BuyStocks;
