import { Route, SourceAirportClass } from '../types'

export const formatRoute = ({stops, routes, last}: Route, sourceAirport: string): string => {
  return `flight from ${sourceAirport} to ${last} with ${stops} transfer by route ${sourceAirport} => ${routes.join(' => ')}`
}

export const formatSourceAirport = (sourceAirport: SourceAirportClass): string => {
  
  const airportRoutes = Object.keys(sourceAirport.routes)

  return `Airport ${sourceAirport.name} have routes to ${airportRoutes.join(', ')}`
}