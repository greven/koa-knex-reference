const { pick } = require('../../lib/objects')

const createQueryFilter = (queryBuilder, queryObject, whiteList) => {
  const picked = pick(queryObject, whiteList)

  Object.keys(picked).map(key => {
    const items = picked[key].split(',')
    items.map((item, index, items) => {
      if (index === 0) {
        queryBuilder.where(key, item.trim())
      }
      if (index !== 0 && items.length > 1) {
        queryBuilder.orWhere(key, item.trim())
      }
    })
  })
}

module.exports = {
  createQueryFilter
}
