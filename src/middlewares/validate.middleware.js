import {
    createEquipmentBodySchema,
    equipmentIdParamsSchema,
    updateEquipmentBodySchema,
} from '../validators/equipment.schemas.js';
import { ValidationError } from '../errors/validation.error.js';

function validateBody(schema, request, next) {
    const result = schema.safeParse(request.body);

    if (result.success === false) {
        return next(
            new ValidationError(
                'Переданы некорректные данные',
                result.error.issues
            )
        );
    }

    request.body = result.data;

    return next();
}

function validateParams(schema, request, next) {
    const result = schema.safeParse(request.params);

    if (result.success === false) {
        return next(
            new ValidationError(
                'Переданы некорректные параметры',
                result.error.issues
            )
        );
    }

    request.params = result.data;

    return next();
}

function validateCreateEquipmentBody(request, response, next) {
    return validateBody(createEquipmentBodySchema, request, next);
}

function validateUpdateEquipmentBody(request, response, next) {
    return validateBody(updateEquipmentBodySchema, request, next);
}

function validateEquipmentIdParams(request, response, next) {
    return validateParams(equipmentIdParamsSchema, request, next);
}

export {
    validateCreateEquipmentBody,
    validateUpdateEquipmentBody,
    validateEquipmentIdParams,
};
