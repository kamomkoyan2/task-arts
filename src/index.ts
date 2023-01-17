import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

import * as dotenv from 'dotenv'
dotenv.config();
import sequelize from "./db/database";
import router from "./routes/routes";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: 'http://localhost:3001'}));

const PORT = process.env.APP_PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.use(router)

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
