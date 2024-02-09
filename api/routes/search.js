import Express from "express";
import { GetMovies } from "../controllers/search.js";

const router = Express.Router();

router.post("/",GetMovies)

export default router;