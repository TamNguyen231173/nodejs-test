import express, { Express } from 'express'
import { createServer } from 'http'
import { AddressInfo } from 'net'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import { ENV, PORT } from '~/configs'
import { mainRouter } from '~/routes'
import { errorHandler } from '~/middlewares/error.middleware'
import cors from 'cors'
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";

class WebService {
  protected app: Express = express()
  private port = PORT

  async start() {
    this.useMiddlewares([
      bodyParser.json({ limit: "50mb" }),
      bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000
      }),
      express.json(),
      express.urlencoded({ extended: true }),
      helmet(),
      cors({
        origin: '*'
      }),
      rateLimit({
        windowMs: 1000 * 60 * 60, // an hour
        limit: 10000, // limit each IP to 10000 requests per windowMs
        message: '⚠️Too many request created from this IP, please try again after an hour'
      }),
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
