import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patient';

import { EntryWithoutId, NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';

const patients: PatientEntry[] = patientsData;

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const getPatientById = (id: string): PatientEntry | undefined => {
    console.log('patients', patients);
    return patients.find(patient => patient.id === id);
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    const newId = uuid();
    const newPatientEntry = {
        id: newId,
        ...entry,
        entries: []
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addPatientEntry = (id: string, entry: EntryWithoutId): PatientEntry => {

    // patient find by id
    const patient = patients.find(patient => patient.id === id);

    if (!patient) {
        throw new Error("Patient not found");
    }

    // generate new uuid
    const newEntryId = uuid();
    // add
    const newEntry = {
        id: newEntryId,
        ...entry
    };
    // push 
    patient?.entries.push(newEntry);
    // return
    return patient;

};

export default {
    getNonSensitiveEntries,
    addPatient,
    getPatientById,
    addPatientEntry
};