const yup = require('yup')
const validator = require('validator')

const flightSchema = yup.object().shape({

  id: yup.string()
    .test({
      name: 'id',
      message: '${path} must be uuid', // eslint-disable-line
      test: value => value ? validator.isUUID(value) : true
    }),

  origin: yup.string()
    .required()
    .trim(),

  destination: yup.string()
    .required()
    .trim(),

  company: yup.string()
    .required()
    .trim(),

  date: yup.string()
    .required()
    .test({
      name: 'date',
      message: '${path} must be valid ISO8601 date', // eslint-disable-line
      test: value => value ? validator.isISO8601(new Date(value).toISOString()) : true
    })
    .transform(value => {
      return this.isType(value) && value !== null
        ? new Date(value).toISOString()
        : value
    })
    .default(() => new Date().toISOString()),

  note: yup.string()
    .trim()
})
  .noUnknown()

module.exports = flightSchema
