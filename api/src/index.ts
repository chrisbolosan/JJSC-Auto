import express, { type Express, type Request, type Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
//import function from services
import { getMessage } from './services/homepage.service';
const app: Express = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT ?? 4000;
//only for db testing routing, disabled so web runs
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World! Test');
// });
//create express route for the message from services
app.get('/api/homepage/message', (req: Request, res: Response) => {
  res.json(getMessage());
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
