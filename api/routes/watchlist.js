import Express from "express";
import { AddWatchlist,GetWatchlist,DeleteWatchlist } from "../controllers/watchlist.js";

const router = Express.Router();

router.get("/",GetWatchlist)
router.post("/",AddWatchlist);
router.post("/delete",DeleteWatchlist);

export default router;