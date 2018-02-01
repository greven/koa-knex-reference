const _ = require('lodash')
const chalk = require('chalk')

/**
 * Pretty printing for an Object.
 *
 * @param {Object} object - The object to pretty print.
 * @param {string[]} filters - An optional array with properties to filter from the object.
 * @param {string} message - Optional header message.
 */
const printObject = function (object, filters, message) {
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
 * @param {string[]} filters - An optional array with properties to filter from the objects.
 */
const printArrayOfObjects = function (array, filters) {
  array.forEach((element, idx, array) => {
    printObject(_.omit(element, filters))
    if (idx !== array.length - 1) {
      console.log(chalk.white('- - -\n'))
    }
  })
}

module.exports = { printObject, printArrayOfObjects }
