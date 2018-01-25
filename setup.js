const fs = require('fs')

// Create the .env file from the example
fs.createReadStream('.env-example')
  .pipe(fs.createWriteStream('.env'))
