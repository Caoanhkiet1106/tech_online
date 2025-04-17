import express from 'express'
import dotenv from 'dotenv'
const app = express()
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import { AppRoute } from './AppRoute.js'

app.get('/', (req, res) => {
  res.send('Hello World!')
})
AppRoute(app)
const port = process?.env?.PORT ?? 3000
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})