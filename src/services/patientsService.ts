import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patient';

import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';

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

export default {
    getNonSensitiveEntries,
    addPatient,
    getPatientById
};