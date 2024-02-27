import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import express from 'express'

const port = process.env.PORT || 3000
let app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.static('bundle'))

// 404 Route (всегда последним!)
app.get('*', function (req, res) {
    res.status(404).send('404. Unable to find the requested resource!')
})

app.listen(port, () => {
    console.log(`Version: ${process.env.npm_package_version}`)
    console.log(`Application listening on port: ${port}`)
    console.log(`CORS-enabled...`)
})