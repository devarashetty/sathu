import React from 'react'
import { connect } from 'react-redux'
import { ACTIONS } from '../reducers'
import data from '../data.json'

console.log('ACTIONS',data)

class Container extends React.Component {
 
  constructor(){
    super();
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
  }
    
  componentWillMount(){
    const {dispatch} = this.props;
    dispatch({type:ACTIONS.COMPONENT_INITIALIZE,payload:data.transactions})
  } 

  handleFilterUpdate(type,optionValue){
    // conso
    const { dispatch,filterOptions } = this.props;
    let newOptions = filterOptions[type];
    
    if (filterOptions[type] && filterOptions[type].includes(optionValue)){
      newOptions = newOptions.filter((d)=>(d !== optionValue))
    }else {
      newOptions.push(optionValue)
    }

    dispatch(
      {
        type:ACTIONS.UPDATE_FILTER_OPTIONS,
        payload:{
          [type]:newOptions
        }
      }
    )
  }
  render(){ 
    const props = {
      handleFilterUpdate : this.handleFilterUpdate
    }
    return React.cloneElement(this.props.children,{
      ...this.props,
      ...props
    })
  }
}


const mapStateToProps = state => {
  const { data, filterOptions } = state;
  
  const filteredData = data.filter(function(d){
    let res = true;
    Object.keys(filterOptions).forEach(
      function (key) {
        if (filterOptions[key].length && !(filterOptions[key].includes(d[key]))) {
          res = false;
        }
      }      
    );
    return res;
  })
  

  return {
    ...state,
    filteredData
  }
}


export default connect(
  mapStateToProps
)(Container)