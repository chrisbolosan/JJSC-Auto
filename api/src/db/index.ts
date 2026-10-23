import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
const app: Express = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT ?? 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! Test');
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
