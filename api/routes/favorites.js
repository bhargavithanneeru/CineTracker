import Express from "express";
import { AddFavorite,GetFavorite,DeleteFavorite } from "../controllers/favorites.js";

const router = Express.Router();

router.get("/",GetFavorite)
router.post("/",AddFavorite);
router.post("/delete",DeleteFavorite);

export default router;