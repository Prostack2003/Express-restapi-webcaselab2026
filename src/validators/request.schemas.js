import { z } from 'zod';

const requestPriorityTypeSchema = z.enum(['low', 'medium', 'high']);
const requestStatusSchema = z.enum(['new', 'in_progress', 'done', 'rejected']);

const requestIdParamsSchema = z.object({
    id: z.uuid(),
});

const createRequestBodySchema = z.object({
    equipmentId: z.uuid(),
    title: z.string().trim().min(3),
    description: z.string().trim().min(1),
    priority: requestPriorityTypeSchema,
    plannedAt: z.iso.date(),
});

const updateRequestBodySchema = createRequestBodySchema.partial();

const changeRequestStatusBodySchema = z.object({
    status: requestStatusSchema,
});

export {
    requestIdParamsSchema,
    createRequestBodySchema,
    updateRequestBodySchema,
    changeRequestStatusBodySchema,
};
