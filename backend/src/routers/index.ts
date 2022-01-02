/* eslint-disable import/prefer-default-export */
import { Request, Response, Router } from 'express';
import commandRouter from './commands';
import victimRouter from './victims';

const router = Router();

/* * Index router * */
router.use('/victims', victimRouter);
router.use('/commands', commandRouter);

/**
 * Check if API is running
 */
router.get('/health-check', (_req: Request, res: Response) =>
  res.status(200).json({
    message: `App is running well at port ${process.env.PORT}`,
  })
);

export default router;
