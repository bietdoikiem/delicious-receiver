import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Check if server is running
 */
// eslint-disable-next-line arrow-body-style
app.get('/health-check', (_req: Request, res: Response) => {
  return res.status(200).json({
    message: `App is running well at port ${process.env.PORT}`,
  });
});

/**
 * Receive payload of victim endpoint
 */
app.post('/', (req: Request, res: Response) => {
  console.log(req.body);
  return res.status(200).send();
});

/**
 * Endpoint to receive log of tunnel from localhost victim
 */
app.post('/tunnels/log', (req: Request, res: Response) => {
  const { log } = req.body;
  console.log(log);
  return res.status(200).send();
});

// eslint-disable-next-line arrow-body-style
app.post('/victims', (_req: Request, res: Response) => {
  return res.status(200).send();
});

/**
 * Server Listener
 */
app.listen(Number(process.env.PORT), () => {
  console.log(
    `Receiver Server is running at port ${process.env.PORT} in ${process.env.APP_ENV} environment`
  );
});
