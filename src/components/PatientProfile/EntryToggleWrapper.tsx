import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import HospitalEntryForm from './HospitalEntryForm';

const EntryToggleWrapper = () => {
    const [showForm, setShowForm] = useState(false);

    const handleToggle = () => {
        setShowForm(prev => !prev);
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

            {showForm && (
                <Box mt={2}>
                    <HospitalEntryForm />
                </Box>
            )}
        </Box>
    );
};

export default EntryToggleWrapper;