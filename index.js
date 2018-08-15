import React from 'react'
import ReactDom from 'react-dom'
import Container from './container'
import store from './store'
import {Provider} from 'react-redux'
import UI from './views';

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Container>
          <UI/>   
        </Container>  
      </Provider>
    )
  }
}

ReactDom.render(<App/>,document.getElementById('app'))