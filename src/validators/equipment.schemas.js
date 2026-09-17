import { z } from 'zod';

const equipmentTypeSchema = z.enum([
    'turbine',
    'inverter',
    'sensor',
    'substation',
]);
const equipmentStatusSchema = z.enum([
    'operational',
    'maintenance',
    'fault',
    'decommissioned',
]);
const locationSchema = z.object({
    lat: z.number().gte(-90).lte(90),
    lon: z.number().gte(-180).lte(180),
});

const installedAtSchema = z.iso.date();

const equipmentIdParamsSchema = z.object({
    id: z.uuid(),
});

const createEquipmentBodySchema = z.object({
    name: z.string().trim().min(3).max(100),
    type: equipmentTypeSchema,
    serialNumber: z.string().trim().min(1),
    location: locationSchema,
    status: equipmentStatusSchema,
    installedAt: installedAtSchema,
});

const updateEquipmentBodySchema = createEquipmentBodySchema.partial();

export {
    createEquipmentBodySchema,
    updateEquipmentBodySchema,
    equipmentIdParamsSchema,
};
