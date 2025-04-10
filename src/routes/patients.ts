import express, { Response } from 'express';

import patientsService from '../services/patientsService';
import { PatientEntry } from '../types';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<PatientEntry[]>) => {
    res.send(patientsService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatientEntry(req.body);
        const addedEntry = patientsService.addPatient(newPatient);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;