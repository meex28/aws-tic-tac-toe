import {Router} from "express";

const router = Router();

router.get('/', async (req, res) => {
  res.status(200).send();
})

export default router;