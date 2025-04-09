import express, { Response } from 'express';

import patientsService from '../services/patientsService';
import { PatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<PatientEntry[]>) => {
    res.send(patientsService.getNonSensitiveEntries());
});

export default router;