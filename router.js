import Home from './pages/Home'

let routeTable = {
  '/': Home
}

export default function router(path) {
  return routeTable[path] || Home
}
