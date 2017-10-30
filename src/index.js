import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter} from 'react-router-dom'
import './styles/index.css'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import { GC_AUTH_TOKEN } from './config/constants'

// 1
import {ApolloProvider, createNetworkInterface, ApolloClient} from 'react-apollo'

// 2
const networkInterface = createNetworkInterface({uri: 'https://api.graph.cool/simple/v1/cj9ckjzd802v90157awa04le2'})

const wsClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/cj9ckjzd802v90157awa04le2', {
  reconnect: true,
  connectionParams: {
     authToken: localStorage.getItem(GC_AUTH_TOKEN),
  }
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    const token = localStorage.getItem(GC_AUTH_TOKEN)
    req.options.headers.authorization = token ? `Bearer ${token}` : null
    next()
  }
}])

// 3
const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
})

// 4
ReactDOM.render(
  <BrowserRouter>
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
</BrowserRouter>, document.getElementById('root'))
registerServiceWorker()
