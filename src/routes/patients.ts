import express, { Response, Request, NextFunction } from 'express';
import { z } from 'zod';
import patientsService from '../services/patientsService';
import { NewPatientEntry, PatientEntry } from '../types';
import { newEntrySchema } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<PatientEntry[]>) => {
    res.send(patientsService.getNonSensitiveEntries());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newEntrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddeware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
    const addedEntry = patientsService.addPatient(req.body);
    res.json(addedEntry);
});

router.use(errorMiddeware);

export default router;