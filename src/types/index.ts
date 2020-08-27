import { SourceAirportClass } from '../core'

export type Route = {
  routes: string[],
  last: string,
  stops: number,
}

export { SourceAirportClass }

export type DictionarySourceAirport = Map<string, SourceAirportClass>