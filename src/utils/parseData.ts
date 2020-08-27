import { readFileByName } from './readFile'
import { SourceAirportClass, DictionarySourceAirport } from '../types'

type airFlight = {
  Airline: string,
  AirlineID: string,
  SourceAirport: string,
  SourceAirportID: string,
  DestinationAirport: string,
  DestinationAirportID: string,
  CodeShare: string,
  Stops: string,
  Equipment: string,
}

export const parse = (fileName: string): DictionarySourceAirport => {
  const data = readFileByName(fileName)
  const parsedData: airFlight[] = data.map(line => {
    const data = line.split(',')
    return {
      Airline: data[0],
      AirlineID: data[1],
      SourceAirport: data[2],
      SourceAirportID: data[3],
      DestinationAirport: data[4],
      DestinationAirportID: data[5],
      CodeShare: data[6],
      Stops: data[7],
      Equipment: data[8],
    }
  })
  const mapData: DictionarySourceAirport = new Map()

  parsedData.forEach(({ SourceAirport, SourceAirportID, DestinationAirport, DestinationAirportID, Airline, Stops, Equipment }) => {
    if (!mapData.has(SourceAirport)) {
      const SA = new SourceAirportClass(SourceAirportID, SourceAirport)
      SA.addRoutes(DestinationAirportID, DestinationAirport, Airline, Stops, Equipment)
      mapData.set(SourceAirport, SA)
    } else {
      const SA = mapData.get(SourceAirport)
      SA.addRoutes(DestinationAirportID, DestinationAirport, Airline, Stops, Equipment)
      mapData.set(SourceAirport, SA)
    }
  })

  return mapData
}