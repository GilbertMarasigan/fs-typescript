import React, { useState } from 'react';
import { Button, Box, Alert } from '@mui/material';
import HospitalEntryForm from './HospitalEntryForm';

const EntryToggleWrapper = () => {
    const [showForm, setShowForm] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);


    const handleToggle = () => {
        setShowForm(prev => !prev);
        setNotification(null); // clear any previous notification
    };

    const handleSuccess = () => {
        setShowForm(false);
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
                        onSuccess={handleSuccess}
                        setNotification={setNotification}
                    />
                </Box>
            )}
        </Box>
    );
};

export default EntryToggleWrapper;