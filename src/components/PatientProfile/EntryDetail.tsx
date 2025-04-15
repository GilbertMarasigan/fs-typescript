import { useState, useEffect } from "react";
import { Entry, Diagnosis } from "../../types";
import diagnosesService from "../../services/diagnoses";
import { Favorite, Work, LocalHospital } from '@mui/icons-material';
import './index.css';

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

// 2 - 3 red
// 0 success
// 1 yellow

const healthRatingColor = (rating: number): string => {
    switch (rating) {
        case 0:
            return 'green';
        case 2:
        case 3:
            return 'red';
        case 1:
            return 'goldenrod';
        default:
            break;
    }
};

const EntryDetail = ({ entry }: { entry: Entry }) => {

    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        const fetchDiagnosesList = async () => {
            const diagnoses = await diagnosesService.getAll();
            setDiagnoses(diagnoses);
        };

        void fetchDiagnosesList();
    }, [entry]);

    console.log('entry', entry);

    switch (entry.type) {
        case "HealthCheck":
            return (<div className="entry-card">
                <div>{entry.date} <i>{entry.description}</i></div><Favorite sx={{ color: healthRatingColor(entry.healthCheckRating) }} />
                <ul>
                    {entry.diagnosisCodes?.map((code: string, index: number) => (
                        <li key={index}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
                    ))}
                </ul>
                <div>diagnose by {entry.specialist}</div>
            </div>);
        case "OccupationalHealthcare":
            return (<div className="entry-card">
                <div>{entry.date} <i>{entry.description}</i></div><Work />
                <ul>
                    {entry.diagnosisCodes?.map((code: string, index: number) => (
                        <li key={index}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
                    ))}
                </ul>
                <div>diagnose by {entry.specialist}</div>
            </div>);
        case "Hospital":
            return (<div className="entry-card">
                <div>{entry.date} <i>{entry.description}</i></div><LocalHospital />
                <ul>
                    {entry.diagnosisCodes?.map((code: string, index: number) => (
                        <li key={index}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
                    ))}
                </ul>
                <div>diagnose by {entry.specialist}</div>
            </div>);
        default:
            return assertNever(entry);
    }

};

export default EntryDetail;