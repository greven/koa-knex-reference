const chalk = require('chalk')
const opn = require('opn')
const config = require('./config')
const app = require('./app')

const {
  port,
  host
} = config.server

app.listen(port, () => {
  const uri = 'http://' + host + ':' + port
  console.log(chalk.green('Server started on ' + uri))
  opn(uri)
})

app.on('listen', () => { console.log('LISTENiNG!') })
