import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TransactionList from './transaction-list'
import TransactionDetails from './transaction-details'


export default  class UI extends React.Component {
  
  constructor () {
    super ()
  }

  render () {
    const {filteredData=[],handleFilterUpdate, filterOptions} = this.props 
    return (
      <Router >
        <div>
          
          <Route 
            exact 
            path='/' 
            filterData= {filteredData}
            render = {
              (props)=>{
                return (
                  <div>
                    <TransactionList 
                      filterData = {filteredData}
                      handleFilterUpdate={handleFilterUpdate}
                      filterOptions ={filterOptions}
                      {...props}
                    />
                  </div>
                )
              }
            }
          />

          <Route 
            path = '/transactionDetails/:id' 
            render = {
              (props)=>{
                console.log('props',props);
                const accountId = props.match.params.id;
                const transactionSpecificDetails = this.props.filteredData.filter((d)=>(String(d.account) === String(accountId)))
                // TransactionDetails
                return (
                  <div>
                    <TransactionDetails 
                      details = {
                        transactionSpecificDetails.length 
                        ? 
                          transactionSpecificDetails[0]
                        :
                          {}
                      }
                      handleFilterUpdate = {handleFilterUpdate}
                    />
                  </div>
                )
              }
            }
          />

        </div>
      </Router>
    )
  }
}
