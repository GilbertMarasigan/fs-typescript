import diagnosisData from '../../data/diagnoses';

import { DiagnosisEntry } from '../types';

const diagnoses: DiagnosisEntry[] = diagnosisData;

const getEntries = (): DiagnosisEntry[] => {
    return diagnoses;
};

export default {
    getEntries
};