import React from 'react';
import { Input, Button, Popup } from 'semantic-ui-react'



class BuyStocks extends React.Component {


  render(){
    return (
      <React.Fragment>
        total price = ${(this.props.latestPrice * this.props.purchaseQuantity).toFixed(2)}
          <br/>
        Remaining Balance = ${(this.props.balance - (this.props.latestPrice * this.props.purchaseQuantity)).toFixed(2)}
          <br/>
        <Input type={'number'} placeholder={'How many stocks you want?'} value={this.props.purchaseQuantity} onChange={this.props.handlePurchase}/>
        <Popup  content='You do not have enough funds' disabled={this.props.enoughFunds || this.props.purchaseQuantity === 0} trigger={
          <span>
            <Button icon={'cart'} disabled={!this.props.enoughFunds || !this.props.purchaseQuantity } content={'Purchase'} onSubmit={this.props.handlePurchaseSubmit}/>
          </span>}
        />
      </React.Fragment>
    )
  }
}

export default BuyStocks;
