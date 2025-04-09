export interface DiagnosisEntry {
    code: string
    name: string,
    latin?: string
};

export type PatientEntry = {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn?: string,
    gender: string,
    occupation: string
};

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

// "id": "d2773336-f723-11e9-8f0b-362b9e155667",
// "name": "John McClane",
// "dateOfBirth": "1986-07-09",
// "ssn": "090786-122X",
// "gender": "male",
// "occupation": "New york city cop"
