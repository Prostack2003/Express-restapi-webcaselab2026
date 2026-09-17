import { randomUUID } from 'node:crypto';
import * as equipmentRepository from '../repositories/equipment.repository.js';

function createEquipment(data) {
    const existingEquipment = equipmentRepository.findBySerialNumber(
        data.serialNumber
    );

    if (existingEquipment !== null) {
        throw new Error(
            `Оборудование с серийным номером "${data.serialNumber}" уже существует`
        );
    }

    const equipment = {
        id: randomUUID(),
        name: data.name,
        type: data.type,
        serialNumber: data.serialNumber,
        location: structuredClone(data.location),
        status: data.status,
        installedAt: data.installedAt,
    };

    return equipmentRepository.create(equipment);
}

function listEquipment() {
    return equipmentRepository.findAll();
}

function getEquipmentById(equipmentId) {
    const equipment = equipmentRepository.findById(equipmentId);
    if (equipment === null) {
        throw new Error(
            `Оборудование с идентификатором "${equipmentId}" не найдено`
        );
    }

    return equipment;
}

function updateEquipment(equipmentId, changes) {
    getEquipmentById(equipmentId);

    if (changes.serialNumber !== undefined) {
        const existingEquipment = equipmentRepository.findBySerialNumber(
            changes.serialNumber
        );

        if (
            existingEquipment !== null &&
            existingEquipment.id !== equipmentId
        ) {
            throw new Error(
                `Оборудование с серийным номером "${changes.serialNumber}" уже существует`
            );
        }
    }

    return equipmentRepository.update(equipmentId, changes);
}

function deleteEquipment(equipmentId) {
    getEquipmentById(equipmentId);
    return equipmentRepository.remove(equipmentId);
}

export {
    createEquipment,
    updateEquipment,
    deleteEquipment,
    listEquipment,
    getEquipmentById,
};
