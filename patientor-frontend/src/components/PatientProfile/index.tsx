import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PatientEntries from './PatientEntries';
import patientService from '../../services/patients';

import { Patient } from '../../types';
import EntryToggleWrapper from './EntryToggleWrapper';

const PatientProfile = () => {

    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | null>(null);

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

    const sortedEntries = [...patient.entries].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div>
            <h2>{patient.name} {patient.gender === 'male' ? ('♂') : ('♀')}</h2>
            <p>SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
            <h3>entries</h3>
            <EntryToggleWrapper
                patientId={patient.id}
                setPatient={setPatient}
            />
            <PatientEntries patientEntries={sortedEntries} />
        </div>
    );
};

export default PatientProfile;