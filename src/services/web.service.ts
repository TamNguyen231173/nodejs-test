import express, { Express } from 'express'
import { createServer } from 'http'
import { AddressInfo } from 'net'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import { ENV, PORT } from '~/configs'
import { mainRouter } from '~/routes'
import { errorHandler } from '~/middlewares/error.middleware'

class WebService {
  protected app: Express = express()
  private port = PORT

  async start() {
    this.useMiddlewares([
      express.json(),
      express.urlencoded({ extended: true }),
      helmet(),
      morgan(ENV === 'development' ? 'dev' : 'combined'),
      compression(),
      mainRouter,
      errorHandler
    ])

    const http = createServer(this.app)
    http.listen(this.port, () => {
      const address = http.address() as AddressInfo
      console.log(`Server running at http://localhost:${address.port}`)
    })
  }

  useMiddlewares(middlewares: any[] = []) {
    for (const middleware of middlewares) {
      this.app.use(middleware)
    }
  }
}

const webService = new WebService()
export default webService
