import express, { Request, Response } from 'express';
import { commandRouter, victimRouter } from './routers';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* * Override logging * */

/* * Router endpoints * */
app.use('/victims', victimRouter);
app.use('/commands', commandRouter);

/* * Entry endpoints * */
/**
 * Check if server is running
 */
app.get('/health-check', (_req: Request, res: Response) =>
  res.status(200).json({
    message: `App is running well at port ${process.env.PORT}`,
  })
);

// Server Listener
app.listen(Number(process.env.PORT), () => {
  console.log(
    `Receiver Server is running at port ${process.env.PORT} in ${process.env.NODE_ENV} environment`
  );
});
