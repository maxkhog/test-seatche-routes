import { parse, formatRoute, promptForMissingOptions, parseArgumentsIntoOptions, formatSourceAirport } from './utils'
import { searchAlgorithm } from './core'
const { performance } = require('perf_hooks');

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  const { fileName, sourceAirportName, destinationAirport, stops, items, airport } = options;

  const mapData = parse(fileName)

  console.info('parse Data')

  if (airport) {
    const SourceAirport = mapData.get(airport)
    console.log(formatSourceAirport(SourceAirport))
    return;
  }

  const _successRoutes = searchAlgorithm(mapData, sourceAirportName, destinationAirport, stops)

  const lengthSuccessRoutes = _successRoutes.length

  console.log('source airport', sourceAirportName)

  if (items === 'all') {
    console.log(`all ${lengthSuccessRoutes} routes`)
    _successRoutes.forEach(r => console.log(formatRoute(r, sourceAirportName)))
  } else {
    const NumberItems = Number(items)
    lengthSuccessRoutes < NumberItems ? console.log(`all ${lengthSuccessRoutes} routes`) : console.log(`first ${NumberItems} routes`)
    const first = _successRoutes.slice(0, NumberItems)
    first.forEach(r => console.log(formatRoute(r, sourceAirportName)))
  }



  console.log('all routes', lengthSuccessRoutes)
  console.log(performance.now())

}