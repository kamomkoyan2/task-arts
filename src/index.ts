import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import sequelize from "./db/database";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: 'http://localhost:3001'}));

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
