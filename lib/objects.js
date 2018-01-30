/**
 * Test if value is an Object.
 *
 * @param {Object} v - Variable to be checked.
 * @returns {boolean}
 */
const isObject = v => Object(v) === v

/**
 * Tests if the path exists in an object.
 *
 * @param {function} fn - Function returning the path to test
 * @returns {boolean}
 */
const isSet = (fn) => {
  let value
  try {
    value = fn()
  } catch (e) {
    value = undefined
  } finally {
    return value !== undefined // eslint-disable-line
  }
}

/**
 * Create a new object with picked properties.
 *
 * @param {Object} object - The object to be filtered.
 * @param {string[]} properties - Array of properties to filter.
 * @returns {Object} - The picked object.
 */
const pick = (object, properties) => {
  const keys = Object.keys(object)
    .filter(key => properties.includes(key))
    .filter(key => object[key]) // discard empty values

  let picked = {}
  keys.map(key => {
    picked[key] = object[key]
  })
  return picked
}

/**
 * Create a new object with omitted (filtered) properties.
 *
 * @param {Object} object - The object to be filtered.
 * @param {string[]} properties - Array of properties to omit.
 * @returns {Object} - The filtered object.
 */
const omit = (object, properties) => {
  const keys = Object.keys(object)
    .filter(key => !properties.includes(key))

  let picked = {}
  keys.map(key => {
    picked[key] = object[key]
  })
  return picked
}

module.exports = { isObject, isSet, pick, omit }
