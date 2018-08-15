export const ACTIONS = {
  COMPONENT_INITIALIZE : 'initialize',
  UPDATE_FILTER_OPTIONS: 'updateFilterOptions'
}

const initialFilterOptions = {
  accountName:[],
  transactionType :[]
}

function data(state=[],action){
  console.log('action',action)
  switch (action.type) {
    case ACTIONS.COMPONENT_INITIALIZE :
      return action.payload
    default :
      return state
  }
}

function filterOptions(state=initialFilterOptions,action){
  console.log('UPDATE_FILTER_OPTIONS',action)
  switch(action.type){
    case ACTIONS.UPDATE_FILTER_OPTIONS:
      return {
        ...state,
        ...action.payload,
      }
      // return Object.assign(state,action.payload)
    default :
     return state
  }
}


export default {
  filterOptions,
  data
}