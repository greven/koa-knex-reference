const chalk = require('chalk')
const config = require('./config')
const app = require('./app')

const {
  port,
  host
} = config.server

app.listen(port, () => {
  console.log(chalk.green('Server started on http://%s:%d'), host, port)
})
