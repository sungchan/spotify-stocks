import React from 'react';
import { List } from 'semantic-ui-react';


class ShowPortfolio extends React.Component {

  render(){
    return (
      <React.Fragment>
        <List  relaxed divided >
          {this.props.ownedStocks.map((stock) => {
            return (
              <List.Item>
                <List.Content>
                  <List.Header>({stock.symbol})- {stock.name} </List.Header>
                  <List.Description>
                    Total Owned: {stock.total_quantity} Total Spent: ${stock.total_value}
                    {this.props.updatePortfolioPrice(stock.symbol)}
                  </List.Description>
                </List.Content>
              </List.Item>
            )
          })}
        </List>
      </React.Fragment>
    )
  }
}

export default ShowPortfolio;
