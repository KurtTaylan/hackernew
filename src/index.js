import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter} from 'react-router-dom'
import './styles/index.css'
// 1
import {ApolloProvider, createNetworkInterface, ApolloClient} from 'react-apollo'

// 2
const networkInterface = createNetworkInterface({uri: 'https://api.graph.cool/simple/v1/cj9ckjzd802v90157awa04le2'})

// 3
const client = new ApolloClient({networkInterface})

// 4
ReactDOM.render(
  <BrowserRouter>
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
</BrowserRouter>, document.getElementById('root'))
registerServiceWorker()
