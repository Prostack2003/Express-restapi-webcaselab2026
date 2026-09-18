import {
    createEquipmentBodySchema,
    equipmentIdParamsSchema,
    updateEquipmentBodySchema,
    equipmentQuerySchema,
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

function validateQuery(schema, request, next) {
    const result = schema.safeParse(request.query);

    if (result.success === false) {
        return next(
            new ValidationError(
                'Переданы некорректные параметры запроса',
                result.error.issues
            )
        );
    }

    request.validatedQuery = result.data;

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

function validateEquipmentQuery(request, response, next) {
    return validateQuery(equipmentQuerySchema, request, next);
}

export {
    validateCreateEquipmentBody,
    validateUpdateEquipmentBody,
    validateEquipmentIdParams,
    validateEquipmentQuery,
};
