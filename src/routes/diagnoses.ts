import express, { Response } from 'express';

import diagnosesService from '../services/diagnosesService';
import { DiagnosisEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<DiagnosisEntry[]>) => {
    res.send(diagnosesService.getEntries());
});

export default router;