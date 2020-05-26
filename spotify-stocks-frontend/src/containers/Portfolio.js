import React from 'react';
import { Search, Button, Label } from 'semantic-ui-react';
import _ from 'lodash';
import PropTypes from 'prop-types'

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
      </React.Fragment>
    )
  }
}

export default Portfolio;
