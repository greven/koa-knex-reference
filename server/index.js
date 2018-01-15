const chalk = require('chalk')
const config = require('./config')
const app = require('./app')

const PROTOCOL = config.server.protocol
const HOST = config.server.host
const PORT = config.server.port

app.listen(PORT, () => {
  console.log(chalk.green('Server started on %s://%s:%d'), PROTOCOL, HOST, PORT)
})
