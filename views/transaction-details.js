import React from 'react'
import {columns} from './transaction-list'
import _ from 'lodash'

export default (props)=>{
  const {details} =props
  return (
    <div className='container'>
      <h2>Transaction {details.account}</h2>
      <hr/>
      <div  style={{display:'flex',flexDirection:'column'}}>
        {
          Object.keys(columns).map((d)=>(
            <div style={{display:'flex'}} >
              <div style={{fontSize:'18px'}}>{_.startCase(_.toLower(columns[d]))} : </div>
              <div style={{color:'rgba(0,0,0,0.4)'}}> {details[d]}</div>
            </div>
          ))  
        }
      </div>
    </div>
  )
}