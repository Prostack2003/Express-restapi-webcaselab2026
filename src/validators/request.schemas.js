import { z } from 'zod';

const requestPriorityTypeSchema = z.enum(['low', 'medium', 'high', 'critical']);
const requestStatusSchema = z.enum(['new', 'in_progress', 'done', 'rejected']);

const requestIdParamsSchema = z.object({
    id: z.uuid(),
});

const createRequestBodySchema = z.object({
    equipmentId: z.uuid(),
    title: z.string().trim().min(5).max(120),
    description: z.string().trim().min(1).max(2000).optional(),
    priority: requestPriorityTypeSchema,
    plannedAt: z.iso.datetime().optional(),
});

const updateRequestBodySchema = createRequestBodySchema
    .partial()
    .refine((value) => Object.keys(value).length > 0, {
        message: 'Передайте хотя бы одно поле для обновления заявки',
        path: [],
    });

const changeRequestStatusBodySchema = z.object({
    status: requestStatusSchema,
});

export {
    requestIdParamsSchema,
    createRequestBodySchema,
    updateRequestBodySchema,
    changeRequestStatusBodySchema,
};
