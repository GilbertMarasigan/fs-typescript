import React, { useState } from 'react';
import { Button, Box, Alert } from '@mui/material';
import HospitalEntryForm from './HospitalEntryForm';
import { Patient } from '../../types';

interface EntryToggleWrapperProps {
    patientId: string;
    setPatient: (patient: Patient) => void;
}

const EntryToggleWrapper: React.FC<EntryToggleWrapperProps> = ({ patientId, setPatient }) => {
    const [showForm, setShowForm] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);


    const handleToggle = () => {
        setShowForm(prev => !prev);
        setNotification(null); // clear any previous notification
    };

    const handleSuccess = async (updatedPatient: Patient) => {
        setPatient(updatedPatient); // update patient data
        setShowForm(false);
        setNotification('Entry added successfully');
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Button
                variant={showForm ? 'outlined' : 'contained'}
                color={showForm ? 'secondary' : 'primary'}
                onClick={handleToggle}
            >
                {showForm ? 'Cancel' : 'Add New Entry'}
            </Button>

            {notification && (
                <Box mt={2}>
                    <Alert severity="success">{notification}</Alert>
                </Box>
            )}

            {showForm && (
                <Box mt={2}>
                    <HospitalEntryForm
                        patientId={patientId}
                        onSuccess={handleSuccess}
                        setNotification={setNotification}
                    />
                </Box>
            )}
        </Box>
    );
};

export default EntryToggleWrapper;