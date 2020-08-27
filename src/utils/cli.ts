import * as arg from 'arg';
import * as inquirer from 'inquirer';

export const parseArgumentsIntoOptions = (rawArgs) => {
  const args = arg(
    {
      '--items': String,
      '-i': '--items',
      '--airport': String,
      '-a': '--airport',
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    fileName: args._[0],
    sourceAirportName: args._[1]?.toUpperCase(),
    destinationAirport: args._[2]?.toUpperCase(),
    stops: Number(args._[3]),
    items: args['--items'],
    airport: args['--airport']?.toUpperCase()
  };
}


export const promptForMissingOptions = async (options) => {

  if (options.airport) {
    return options
  }


  const questions = [];


  if (!options.fileName) {
    questions.push({
      name: 'fileName',
      message: 'Please input fileName to use parse',
      default: 'data.txt',
    });
  }

  if (!options.sourceAirportName) {
    questions.push({
      name: 'sourceAirportName',
      message: 'Please input source airport name',
      default: 'AER',
    });
  }

  if (!options.destinationAirport) {
    questions.push({
      name: 'destinationAirport',
      message: 'Please input destination airport name',
      default: 'KZN',
    });
  }


  if (!options.stops) {
    questions.push({
      type: 'list',
      name: 'stops',
      message: 'Please select the number of transfers',
      choices: [0, 1, 2, 3],
      default: 0,
    });
  }

  if (!options.items) {
    questions.push({
      name: 'items',
      message: 'Please input how many routes do you want to see (enter "all" if do you want to see all )',
      default: 10,
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    ...answers,
  };
}