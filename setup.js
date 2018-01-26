const fs = require('fs')

// Create .env from the example file
fs.createReadStream('.env-example')
  .pipe(fs.createWriteStream('.env'))
