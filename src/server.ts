import express from 'express'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import { createServer } from 'http'

import { authRouter } from './api/auth/auth.routes'
import { userRouter } from './api/user/user.routes'

import { logger } from './services/logger.service'

const app = express()
const http = createServer(app)

// Express App Config
app.use(cookieParser())
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

// routes
// const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
// app.all('*', setupAsyncLocalStorage)

app.all('*', (req, res, next) => {
  logger.debug('Request to ' + req.url)
  next()
})
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
// app.use('/api/review', reviewRoutes)
// app.use('/api/car', carRoutes)

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
