import { Route, SourceAirportClass } from '../types/'

export const getRoutes = (sourceAirport: SourceAirportClass): Route[] => {
  if (sourceAirport === undefined) {
    return []
  }

  const _routes = sourceAirport.routes
  return Object.keys(_routes).map((r) => ({ last: r, routes: [r], stops: 0 }))
}