//disabled and run api with next routing. can use for db testing routing.
import express, { type Express, type Request, type Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
const app: Express = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT ?? 4000;

// express route for the message from services
app.get('/api/homepage/message', (req: Request, res: Response) => {
  console.log('express get request execute');
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

export default app;
