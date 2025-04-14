import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../services/patients';
import { Patient, Entry, DiagnosisEntry } from '../types';

const PatientProfile = () => {
    console.log('patient profile');
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | null>(null);

    console.log('id', id);

    useEffect(() => {
        const fetchPatient = async () => {

            if (!id) return;
            try {
                const data = await patientService.getOne(id);
                setPatient(data);
            } catch (error) {
                console.error("Failed to tech patient", error);
            }
        };
        void fetchPatient();
    }, [id]);

    if (!patient) {
        return <div>Loading patient data...</div>;
    }

    console.log('patient.entries', patient);

    return (
        <div>
            <h2>{patient.name} {patient.gender === 'male' ? ('♂') : ('♀')}</h2>
            <p>SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
            <h3>entrieses</h3>
            {
                patient.entries.map((entry: Entry, index: number) => (
                    <div key={index}>
                        <div>{entry.date} <i>{entry.description}</i></div>
                        <ul>
                            {entry.diagnosisCodes?.map((code: string, index: number) => (
                                <li key={index}>{code}</li>
                            ))}
                        </ul>
                    </div>
                )
                )}
        </div>
    );
};

export default PatientProfile;