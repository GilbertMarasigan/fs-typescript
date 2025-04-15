import { useState, useEffect } from "react";
import { Entry, Diagnosis } from "../../types";
import diagnosesService from "../../services/diagnoses";
import { Favorite, Work, LocalHospital } from '@mui/icons-material';
import './index.css';

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
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
                <div>{entry.date} <i>{entry.description}</i></div><Favorite color="success" />
                <ul>
                    {entry.diagnosisCodes?.map((code: string, index: number) => (
                        <li key={index}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
                    ))}
                </ul>
            </div>);
        case "OccupationalHealthcare":
            return (<div className="entry-card">
                <div>{entry.date} <i>{entry.description}</i></div><Work />
                <ul>
                    {entry.diagnosisCodes?.map((code: string, index: number) => (
                        <li key={index}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
                    ))}
                </ul>
            </div>);
        case "Hospital":
            return (<div className="entry-card">
                <div>{entry.date} <i>{entry.description}</i></div><LocalHospital />
                <ul>
                    {entry.diagnosisCodes?.map((code: string, index: number) => (
                        <li key={index}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
                    ))}
                </ul>
            </div>);
        default:
            return assertNever(entry);
    }

};

export default EntryDetail;