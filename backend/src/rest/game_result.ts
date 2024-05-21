import {authorizeCognitoJwtToken} from "../security/auth";
import {getUserGamesResults} from "../service/game_results/game_results_service";
import {Router} from "express";

const router = Router();

router.get('/', async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]
  // TODO: catching unauthorized error
  const tokenPayload = await authorizeCognitoJwtToken(token ?? "").catch((err) => {
    console.error(err)
    res.status(401).send("Unauthorized");
  })
  const userGames = await getUserGamesResults(tokenPayload!!.sub);
  res.send(userGames);
})

export default router;