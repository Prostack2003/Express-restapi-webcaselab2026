import { Router } from 'express';
import {
    createEquipment,
    updateEquipment,
    deleteEquipment,
    listEquipment,
    getEquipmentById,
} from '../../controllers/equipment.controller.js';
import {
    validateCreateEquipmentBody,
    validateUpdateEquipmentBody,
    validateEquipmentIdParams,
    validateEquipmentQuery,
} from '../../middlewares/validate.middleware.js';

const equipmentRouter = Router();

equipmentRouter.get('/equipment', validateEquipmentQuery, listEquipment);
equipmentRouter.post(
    '/equipment',
    validateCreateEquipmentBody,
    createEquipment
);
equipmentRouter.get(
    '/equipment/:id',
    validateEquipmentIdParams,
    getEquipmentById
);
equipmentRouter.patch(
    '/equipment/:id',
    validateEquipmentIdParams,
    validateUpdateEquipmentBody,
    updateEquipment
);
equipmentRouter.delete(
    '/equipment/:id',
    validateEquipmentIdParams,
    deleteEquipment
);

export { equipmentRouter };
