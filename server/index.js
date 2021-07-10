import express from 'express'
import bodyParser from 'body-parser'
import moongoose from 'moongoose'
import cors from 'cors'

const app = express()

app.use(cors())