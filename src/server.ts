import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import { createServer } from 'http'

import { monthDataRouter } from './api/monthData/monthData.routes.js'
import { authRouter } from './api/auth/auth.routes.js'
import { userRouter } from './api/user/user.routes.js'

import { logger } from './services/logger.service.js'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const app = express()
const http = createServer(app)

// Express App Config
app.use(cookieParser())
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
  console.log('dirname', __dirname)
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://localhost:5173'],
    credentials: true,
  }
  console.log('corsOptions', corsOptions)
  app.use(cors(corsOptions))
}

// routes
// const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
// app.all('*', setupAsyncLocalStorage)

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/monthData', monthDataRouter)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 3030
http.listen(port, () => {
  logger.info('Server is running on port: ' + port)
})
