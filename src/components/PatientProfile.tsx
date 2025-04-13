import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../services/patients';
import { Patient } from '../types';

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

    return (
        <div>
            <h2>{patient.name}</h2>
            <p>SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
            <p>Gender: {patient.gender}</p>
            <p>Date of Birth: {patient.dateOfBirth}</p>
        </div>
    );
};

export default PatientProfile;