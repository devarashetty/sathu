import React from 'react'
import _ from 'lodash'

export const columns = {
  account:'ACCOUNT NO',
  accountName:'ACCOUNT NAME',
  currencyCode : 'CURRENCY',
  amount : 'AMOUNT',
  transactionType : 'TRANSACTION TYPE'
}

export default class TransactionList extends React.Component {
  constructor(){
    super()
    this.buildTable = this.buildTable.bind(this);
  }
  
  buildTable = ()=>{
    const {
      filterData=[]
    } = this.props

    console.log('buildTable',this.props)
    
    const columns = {
      account:'ACCOUNT NO',
      accountName:'ACCOUNT NAME',
      currencyCode : 'CURRENCY',
      amount : 'AMOUNT',
      transactionType : 'TRANSACTION TYPE'
    }
    
    
    let columnTdList = Object.values(columns).map((data)=>(<th>{data}</th>))
    
    let rowList = filterData.map((data)=>{
      let tdList = Object.keys(columns).map((key)=>{
        if(key === 'account'){
          return (
            <td>
              <a href={'/transactionDetails/'+ data.account}>
              {data[key]}
              </a>
            </td>
          )
        }
        return (
          <td>{data[key]}</td>
        )
      })
      return (
        <tr>
          {tdList}
        </tr>
      )
    })


    return (
      <table className='table table-bordered'> 
        <thead>
          <tr>
            {columnTdList}
          </tr>
        </thead>
        <tbody>
          {rowList}
        </tbody>
      </table>
    )
  }

  render(){
    const {
      filterData,
      handleFilterUpdate,
      filterOptions
    } = this.props
    console.log('***',handleFilterUpdate)
    const defaultFilterOptions = [
      {
        field:'accountName',
        label:'Account Name',
        options:[
          {
            label:'Savings Account',
            value:'Savings Account'
          },
          {
            label:'Checking Account',
            value:'Checking Account'
          },
          {
            label:'Auto Loan Account',
            value:'Auto Loan Account'
          },
          {
            label:'Credit Card Account',
            value:'Credit Card Account'
          },
          {
            label:'Investment Account',
            value:'Investment Account'
          },
          {
            value:'Money Market Account',
            label:'Money Market Account',
          },
          {
            value:'Personal Loan Account',
            label:'Personal Loan Account'
          },
          {
            label:'Home Loan Account',
            value:'Home Loan Account'
          },
          {
            label:''
          }
        ]
      },
      {
        field:'transactionType',
        label: 'Transaction Type',
        options:[
          {
            label:'deposit',
            value:'deposit'
          },
          {
            label:'withdrawal',
            value:'withdrawal'
          },
          {
            label:'invoice',
            value:'invoice'
          },
          {
            label:'payment',
            value:'payment'
          }
        ]
      }
    ]
    return (
      <div className='container'>
        <h3>My Transactions</h3>
        <hr/>
        <div className='row'>
          <div className='col-md-2'>
            <div>Filters</div>
            {
              defaultFilterOptions.map((d)=>{
                return (
                  <div className='filter-option' style={{backgroundColor:'grey',margin:'20px 0',padding:'0 20px'}}>
                    <div style={{padding:'10px 0'}}> {d.label}</div>
                    <div>
                      {
                        d.options.map((optionData)=>{
                          return(
                            <div className="checkbox">
                              <label>
                                <input 
                                  type="checkbox" 
                                  checked={
                                    filterOptions[d.field] 
                                    ?
                                      filterOptions[d.field].includes(optionData.value)
                                    :
                                      false
                                  }
                                  onClick = {()=>{handleFilterUpdate(d.field,optionData.value)}}
                                  style={{
                                    marginRight:'12px'
                                  }}
                                />
                                {optionData.label}
                              </label>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className='col-md-10'>
            {
              this.buildTable()
            }
          </div>
        </div>
      </div>
    )
  }
}
