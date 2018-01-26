const chalk = require('chalk')
const { omit } = require('../lib/objects')

// -- General utility functions ------------------------------

/**
 * Pretty printing for an Object.
 *
 * @param {Object} object - The object to pretty print.
 * @param {Object[]} filters - An optional array with properties to filter from the object.
 * @param {string} message - Optional header message.
 */
const prettyPrintObject = function (object, filters, message) {
  const log = console.log
  message ? log(chalk.green('\n' + message + ':')) : log(' ')
  Object.keys(object).forEach(key => {
    log('  ' + chalk.green('⇢ ', chalk.bold.white(key + ': ')) + chalk.white(object[key]))
  })
  log(' ')
}

/**
 * Pretty print an array of objects.
 *
 * @param {Object[]} array - The array of objects.
 * @param {Object[]} filters - An optional array with properties to filter from the objects.
 */
const prettyPrintArrayOfObjects = function (array, filters) {
  array.forEach((element, idx, array) => {
    prettyPrintObject(omit(element, filters))
    if (idx !== array.length - 1) {
      console.log(chalk.white('- - -\n'))
    }
  })
}

module.exports = { prettyPrintObject, prettyPrintArrayOfObjects }
