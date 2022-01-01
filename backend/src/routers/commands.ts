import { Request, Response, Router } from 'express';

// Init router
const router = Router();

/* * Router Endpoints * */

/**
 * Receive payload of victim endpoint
 */
router.post('/', (req: Request, res: Response) => {
  console.log(req.body);
  return res.status(200).send();
});

export default router;
