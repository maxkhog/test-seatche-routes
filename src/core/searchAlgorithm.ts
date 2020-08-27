import { DictionarySourceAirport, Route } from '../types'
import { getRoutes } from '../utils'

export const searchAlgorithm = (
  mapData: DictionarySourceAirport,
  sourceAirportName: string,
  destinationAirport: string,
  stops: number
): Route[] => {
  const sourceAirport = mapData.get(sourceAirportName)
  const _routesKeys = getRoutes(sourceAirport)
  const _successRoutes: Route[] = []

  while (_routesKeys.length !== 0) {
    let current = _routesKeys.pop()
    if (current.last === destinationAirport) {
      _successRoutes.push(current)
      continue
    }

    const nextRoutes = getRoutes(mapData.get(current.last))

    for (let route of nextRoutes) {
      const newStops = route.stops + current.stops + 1
      if (newStops <= stops) {
        _routesKeys.push({
          last: route.last,
          routes: [...current.routes, route.last],
          stops: newStops,
        })
      }
    }
  }
  return _successRoutes.sort((a, b) => a.stops - b.stops)
}