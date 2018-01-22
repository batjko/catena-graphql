import http from 'http'
import app from './app'
const serverName = require('../package.json').name.toUpperCase()

const PORT = process.env.PORT || 3000

const server = http.createServer(app.callback())

server.listen(PORT, (): void => {
  console.log(`${serverName} listening on port ${PORT}...`)
})
