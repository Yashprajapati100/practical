import express, { Request, Response } from "express"
const { createConnection } = require("typeorm");
import { router } from './routes/routes'
import * as bodyParser from "body-parser";
// import {users} from  "./controller/user"
const app = express();
const port = 4555;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.json());

app.get('/test', (req: Request, resp: Response) => {
  resp.json({
    data: "test done"
  })
})
createConnection(
  {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "tristate123",
    database: "todo-typeorm",
    synchronize: true,
    //entities: [User],
    entities: ['./relation/*.ts'],
    //logging: true
  }
).then(() => {
  console.log("database is connected")
}).catch((error) => {
  console.log(error)
})
app.use('/',router)
app.listen(port, (): void => {
  console.log("server is running on port " + port)
})