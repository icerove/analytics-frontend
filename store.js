// store.js
import React, { createContext, useReducer, useContext } from 'react'
import * as events from './events'
import { Map, List } from 'immutable'
import { Platform } from 'react-native'
import router from './router'

const initialState = Map({
  userContent: {
    username: '',
    email: '',
    password: ''
  },
  projectName: '',
  queryContent: {
    title: '',
    query: '',
    chartType: 'line',
    projectId: ''
  },
  login:{username:'', password: ''},
  username: '',
  userId: '',
  projectId: '',
  queryId: '',
  result: '',
  error: '',
  path: Platform.OS == 'web' ? window.location.pathname : '/', // no edit
})
export const store = createContext(initialState)
const { Provider } = store

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    return events[action.type](state, action)
  }, initialState)
  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

let _d = (e) => {}

export function d(type, args = {}) {
  _d({ ...args, type })
}

if (Platform.OS == 'web') {
  window.d = d
}

export function App_() {
  let { state, dispatch } = useContext(store)
  _d = dispatch

  if (Platform.OS == 'web') {
    window.state = state
  }
  let Page = router(state.get('path'))
  return <Page state={state} />
}
