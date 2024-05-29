import {Router} from "express";

const router = Router();

router.get('/', async (req, res) => {
  res.status(200).send();
})

// use this endpoint to demonstrate usage of cloudwatch alarm
router.get('/server-error', async (req, res) => {
  res.status(500).send("Return error :)");
})

export default router;