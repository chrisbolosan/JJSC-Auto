import express, { type Express, type Request, type Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
const app: Express = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT ?? 3000;
//only for db testing routing, disabled so web runs
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World! Test');
// });

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
