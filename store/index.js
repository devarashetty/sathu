import { createStore,combineReducers, applyMiddleware } from 'redux'
import reducers from '../reducers'
console.log('reducers',reducers)

// function logger({ getState }) {
//   return function(next){
//     return function(action){
//        // returnValue = next(action)
//       console.log('state after dispatch', getState())  ​
//       // return returnValue 
//     }
//   }
// }

const store = createStore(
                combineReducers(reducers),
                // applyMiddleware(logger)
              )


export default store

