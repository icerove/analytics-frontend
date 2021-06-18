import { d } from '../store'
import { Platform } from 'react-native'

// database setup method
export const setUserContent = (state, {username, email, password}) => {
  return state.set('userContent', {username, email, password})
}

export const setLogin = (state, {username, password}) => {
  return state.set('login', {username, password})
}

export const setProjectName = (state, {projectName}) => {
  return state.set('projectName', projectName)
}

export const setQueryContent = (state, {title, query, chartType, projectId}) => {
  return state.set('queryContent', {title, query, chartType, projectId})
}

//database return method
export const setUsername = (state, {username}) => {
  return state.set('username', username)
}

// database get method

export const setProjectId = (state, {projectId}) => {
  return state.set('projectId', projectId)
}

export const setQueryId = (state, {queryId}) => {
  return state.set('queryId', queryId)
}

// connector method

export const setResult = (state, {result}) => {
  return state.set('result', result)
}

export const setError = (state, {error}) => {
  return state.set('error', error)
}

// do not edit
export const goPath = (state, { path }) => {
  if (Platform.OS == 'web') {
    const url = new URL(window.location)
    url.pathname = path
    window.history.pushState({}, '', url)
  }

  return state.set('path', path)
}

export const _setState = (_state, { newState }) => {
  return newState
}

if (Platform.OS == 'web') {
  window.setState = (newState) => {
    d('_setState', { newState })
  }
}
