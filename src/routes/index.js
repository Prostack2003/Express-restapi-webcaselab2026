import { Router } from 'express';
import { healthRouter } from './health/health.routes.js';
import { equipmentRouter } from './equipment/equipment.routes.js';

const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(equipmentRouter);

export { apiRouter };
