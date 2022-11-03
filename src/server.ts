import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index'


dotenv.config();

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

const corsOptions = {
    origin: 'http://localhost',
    optionSuccessStatus:200 
}


app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json())
app.use('/api',routes)

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.get('/test-cors', cors(corsOptions),function (req,res,next){
    res.json({msg: 'This is CORS-enabled with a middle ware'})
})


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;