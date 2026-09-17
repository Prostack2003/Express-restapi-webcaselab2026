import { randomUUID } from 'node:crypto';
import * as equipmentRepository from '../repositories/equipment.repository.js';
import { NotFoundError } from '../errors/not-found.error.js';
import { ConflictError } from '../errors/conflict.error.js';
import { ValidationError } from '../errors/validation.error.js';

function createEquipment(data) {
    validateInstalledAt(data.installedAt);
    const existingEquipment = equipmentRepository.findBySerialNumber(
        data.serialNumber
    );

    if (existingEquipment !== null) {
        throw new ConflictError(
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
        throw new NotFoundError(
            `Оборудование с идентификатором "${equipmentId}" не найдено`
        );
    }

    return equipment;
}

function updateEquipment(equipmentId, changes) {
    getEquipmentById(equipmentId);

    if (Object.keys(changes).length === 0) {
        throw new ValidationError('Переданы некорректные данные', [
            {
                field: 'body',
                message: 'Укажите хотя бы одно поле для обновления',
            },
        ]);
    }

    if (changes.serialNumber !== undefined) {
        const existingEquipment = equipmentRepository.findBySerialNumber(
            changes.serialNumber
        );

        if (
            existingEquipment !== null &&
            existingEquipment.id !== equipmentId
        ) {
            throw new ConflictError(
                `Оборудование с серийным номером "${changes.serialNumber}" уже существует`
            );
        }
    }

    if (changes.installedAt !== undefined) {
        validateInstalledAt(changes.installedAt);
    }

    return equipmentRepository.update(equipmentId, changes);
}

function deleteEquipment(equipmentId) {
    getEquipmentById(equipmentId);
    return equipmentRepository.remove(equipmentId);
}

function validateInstalledAt(installedAt) {
    const installedDate = new Date(installedAt);
    const currentDate = new Date();

    if (installedDate > currentDate) {
        throw new ValidationError('Переданы некорректные данные', [
            {
                field: 'installedAt',
                message: 'Дата установки не может быть в будущем',
            },
        ]);
    }
}

export {
    createEquipment,
    updateEquipment,
    deleteEquipment,
    listEquipment,
    getEquipmentById,
};
