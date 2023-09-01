import express, { NextFunction, Request, Response } from 'express';

import AppApi from './app/api'
import morgan from 'morgan';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(morgan('tiny'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.use("/api/v1", AppApi)

app.use((err, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }

  if (err.status) {
    return res.status(err.status).json({ message: err.message, error: err.meta ? err.meta : undefined })
  }
  next(err)
})

app.use((err, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }
  return res.status(500).json({ message: "Internal server error" })
})




app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
