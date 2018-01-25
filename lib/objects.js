const isObject = v => Object(v) === v

// returns a new object from the non-undefined passed properties
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

// returns a new object removing the passed properties
const omit = (object, properties) => {
  const keys = Object.keys(object)
    .filter(key => !properties.includes(key))

  let picked = {}
  keys.map(key => {
    picked[key] = object[key]
  })
  return picked
}

module.exports = { isObject, pick, omit }
