import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from './services/reducers/store'
import thunk from 'redux-thunk'
import './styles.css'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(applyMiddleware(thunk))
const store = createStore(rootReducer, enhancer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)