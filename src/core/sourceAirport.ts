export class SourceAirportClass {
  name: string
  id: number
  routes: {
    [key: string]: {
      destinationAirportId: string
      destinationAirport: string
      airline: { Airline: string, Stops: string, Equipment: string }[]
    }
  } = {}

  constructor(id, name) {
    this.id = id
    this.name = name
  }

  addRoutes = (destinationAirportId: string, destinationAirport: string, Airline: string, Stops: string, Equipment: string) => {
    if (this.routes[destinationAirport]) {
      this.routes[destinationAirport] = {
        ...this.routes[destinationAirport],
        airline: [...this.routes[destinationAirport].airline, { Airline, Stops, Equipment }]
      }
      return
    }
    this.routes = {
      ...this.routes,
      [destinationAirport]: {
        destinationAirport,
        destinationAirportId,
        airline: [{ Airline, Stops, Equipment }]
      }
    }
  }
}