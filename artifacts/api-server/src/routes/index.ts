import { Router, type IRouter } from "express";
import healthRouter from "./health";
import buildverseRouter from "./buildverse";

const router: IRouter = Router();

router.use(healthRouter);
router.use(buildverseRouter);

export default router;
