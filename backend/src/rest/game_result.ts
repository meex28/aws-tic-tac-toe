import {authorizeCognitoJwtToken} from "../security/auth";
import {getUserGamesResults} from "../service/game_results/game_results_service";
import {Router} from "express";

const router = Router();

router.get('/', async (req, res) => {
  const tokenSplit = req.headers.authorization?.split(" ")
  if (tokenSplit === undefined || tokenSplit.length < 2) {
    res.status(401).send("Unauthorized");
    return;
  }
  const token = tokenSplit[1]
  const tokenPayload = await authorizeCognitoJwtToken(token ?? "").catch((err) => {
    console.error(err)
    res.status(401).send("Unauthorized");
  })
  const userGames = await getUserGamesResults(tokenPayload!!.sub).catch((err) => {
    console.log(err)
    res.status(500).send(err);
  })
  res.send(userGames);
})

export default router;