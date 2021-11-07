import './loadEnv.js'
import express from 'express';
import router from './routes/routes.js'

const PORT = 11000;

const app = express();

app.set('view engine', 'pug')

app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', router)

app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`)
})