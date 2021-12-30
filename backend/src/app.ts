import express, { Request, Response } from 'express';
import { victimRouter } from './routers';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* * Router endpoints * */
app.use('/victims', victimRouter);

/* * Entry endpoints * */
/**
 * Check if server is running
 */
app.get('/health-check', (_req: Request, res: Response) =>
  res.status(200).json({
    message: `App is running well at port ${process.env.PORT}`,
  })
);

/**
 * Receive payload of victim endpoint
 */
app.post('/', (req: Request, res: Response) => {
  console.log(req.body);
  return res.status(200).send();
});

// Server Listener
app.listen(Number(process.env.PORT), () => {
  console.log(
    `Receiver Server is running at port ${process.env.PORT} in ${process.env.APP_ENV} environment`
  );
});
