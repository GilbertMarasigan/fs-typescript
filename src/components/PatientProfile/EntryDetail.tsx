import { useState, useEffect } from "react";
import { Entry, Diagnosis } from "../../types";
import diagnosesService from "../../services/diagnoses";

const EntryDetail = ({ entry }: { entry: Entry }) => {

    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);


    useEffect(() => {
        const fetchDiagnosesList = async () => {
            const diagnoses = await diagnosesService.getAll();
            setDiagnoses(diagnoses);
        };

        void fetchDiagnosesList();
    }, []);

    console.log('diagnoses', diagnoses);

    return (<div>
        <div>{entry.date} <i>{entry.description}</i></div>
        <ul>
            {entry.diagnosisCodes?.map((code: string, index: number) => (
                <li key={index}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
            ))}
        </ul>
    </div>);
};

export default EntryDetail;