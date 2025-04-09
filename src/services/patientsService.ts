import patientsData from '../../data/patient';

import { NonSensitivePatientEntry } from '../types';

const patients: NonSensitivePatientEntry[] = patientsData;

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

export default {
    getNonSensitiveEntries
};