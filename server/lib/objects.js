// returns a new object from the non-undefined picked properties
const pick = (object, properties) => {
  const keys = Object.keys(object)
    .filter(key => properties.includes(key))
    .filter(key => object[key])

  let picked = {}
  keys.map(key => {
    picked[key] = object[key]
  })
  return picked
}

module.exports = { pick }
