import { Router } from "express";
import { searchProfilesController } from "./search.controller";

const router = Router();

router.get("/profiles", searchProfilesController);

export default router;