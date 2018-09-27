import React from 'react'
import ReactDom from 'react-dom'
import Container from './container'
import store from './store'
import {Provider} from 'react-redux'
import UI from './views';
import AffectView from './views/demo.js'

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Container>
          <AffectView/>   
        </Container>  
      </Provider>
    )
  }
}

ReactDom.render(<App/>,document.getElementById('app'))