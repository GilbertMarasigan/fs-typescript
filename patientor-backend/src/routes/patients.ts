import express, { Response, Request, NextFunction } from 'express';
import { z } from 'zod';
import patientsService from '../services/patientsService';
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
import { EntryWithoutId, EntryWithoutIdSchema, newEntrySchema } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
    res.send(patientsService.getNonSensitiveEntries());
});

router.get('/:id', (req: Request, res: Response) => {
    console.log('send patient information');
    const patient = patientsService.getPatientById(req.params.id);

    if (patient) {
        res.json(patient);
    } else {
        res.status(404).send({ error: 'Patient not found' });
    }
});

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        EntryWithoutIdSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

type Params = {
    id: string;
};

router.post('/:id/entries', newEntryParser, (req: Request<Params, unknown, EntryWithoutId>, res: Response<PatientEntry | { error: string }>) => {
    console.log('send entry');
    const entry = req.body; // already validated by Zod
    const patient = patientsService.addPatientEntry(req.params.id, entry);

    if (patient) {
        res.json(patient);
    } else {
        res.status(404).send({ error: 'Patient not found' });
    }
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