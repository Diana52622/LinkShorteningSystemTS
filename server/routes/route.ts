import express from "express";
import { redirectToOriginalUrl, shortenLink } from "../controllers/controller";
import { getFullClickStats as getClickStats } from "../controllers/StatsController";

const router = express.Router();

router.post('/shorten', shortenLink); 
router.get('/stats/:shortUrl', getClickStats);
router.get('/:shortUrl', redirectToOriginalUrl); 

export default router;