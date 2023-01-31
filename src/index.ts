import { AppDataSource } from "./libs/common/data-source";
import * as express from "express";
import { userRouter} from "./controller/user.controller";
import bodyParser = require('body-parser');
import { ownerRouter } from "./controller/owner.controller";
import { carRouter } from "./controller/car.controller";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(userRouter);
app.use(ownerRouter);
app.use(carRouter);

app.get('/',(req:express.Request,res:express.Response) => {

    res.send('Server working')

})

app.listen(port,() =>{

    console.log('Listening to port ',port)

})

AppDataSource.initialize().then(async () => {

    console.log('Connected to database...')

}).catch(error => console.log(error))
