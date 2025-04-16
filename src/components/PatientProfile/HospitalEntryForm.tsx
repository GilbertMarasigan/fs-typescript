import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    MenuItem,
    Select,
    InputLabel,
    FormControl
} from '@mui/material';
import { EntryWithoutId } from '../../types';
import patientService from '../../services/patients';

const HospitalEntryForm = () => {
    const { id } = useParams<{ id: string }>();

    const [entryType, setEntryType] = useState<'Hospital' | 'HealthCheck' | 'OccupationalHealthcare'>('Hospital');

    const [formData, setFormData] = useState({
        date: '',
        specialist: '',
        diagnosisCodes: '',
        description: '',
        dischargeDate: '',
        dischargeCriteria: '',
        healthCheckRating: 0,
        employerName: '',
        sickLeaveStart: '',
        sickLeaveEnd: ''
    });

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!id) {
            console.error("Patient ID not found in URL");
            return;
        }

        let formattedEntry: EntryWithoutId;

        const commonFields = {
            date: formData.date,
            type: entryType,
            specialist: formData.specialist,
            diagnosisCodes: formData.diagnosisCodes
                ? formData.diagnosisCodes.split(',').map(code => code.trim())
                : undefined,
            description: formData.description
        };

        switch (entryType) {
            case 'Hospital':
                formattedEntry = {
                    ...commonFields,
                    type: 'Hospital',
                    discharge: {
                        date: formData.dischargeDate,
                        criteria: formData.dischargeCriteria
                    }
                };
                break;
            case 'HealthCheck':
                formattedEntry = {
                    ...commonFields,
                    type: 'HealthCheck',
                    healthCheckRating: Number(formData.healthCheckRating)
                };
                break;
            case 'OccupationalHealthcare':
                formattedEntry = {
                    ...commonFields,
                    type: 'OccupationalHealthcare',
                    employerName: formData.employerName,
                    sickLeave: formData.sickLeaveStart && formData.sickLeaveEnd ? {
                        startDate: formData.sickLeaveStart,
                        endDate: formData.sickLeaveEnd
                    } : undefined
                };
                break;
            default:
                throw new Error('Unsupported entry type');
        }

        console.log('Submitted Entry:', formattedEntry);

        try {
            const updatedPatient = await patientService.addEntry(id, formattedEntry);
            console.log('Updated Patient:', updatedPatient);
        } catch (error) {
            console.error('Error submitting entry:', error);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                Add Entry
            </Typography>
            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
                <FormControl fullWidth>
                    <InputLabel id="entry-type-label">Entry Type</InputLabel>
                    <Select
                        labelId="entry-type-label"
                        value={entryType}
                        label="Entry Type"
                        onChange={e => setEntryType(e.target.value as typeof entryType)}
                    >
                        <MenuItem value="Hospital">Hospital</MenuItem>
                        <MenuItem value="HealthCheck">Health Check</MenuItem>
                        <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange('date')}
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField
                    label="Specialist"
                    value={formData.specialist}
                    onChange={handleChange('specialist')}
                    required
                />
                <TextField
                    label="Diagnosis Codes (comma-separated)"
                    value={formData.diagnosisCodes}
                    onChange={handleChange('diagnosisCodes')}
                />
                <TextField
                    label="Description"
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={handleChange('description')}
                    required
                />

                {entryType === 'Hospital' && (
                    <>
                        <Typography variant="subtitle1">Discharge</Typography>
                        <TextField
                            label="Discharge Date"
                            type="date"
                            value={formData.dischargeDate}
                            onChange={handleChange('dischargeDate')}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                        <TextField
                            label="Discharge Criteria"
                            value={formData.dischargeCriteria}
                            onChange={handleChange('dischargeCriteria')}
                            required
                        />
                    </>
                )}

                {entryType === 'HealthCheck' && (
                    <TextField
                        label="Health Check Rating (0-3)"
                        type="number"
                        inputProps={{ min: 0, max: 3 }}
                        value={formData.healthCheckRating}
                        onChange={handleChange('healthCheckRating')}
                        required
                    />
                )}

                {entryType === 'OccupationalHealthcare' && (
                    <>
                        <TextField
                            label="Employer Name"
                            value={formData.employerName}
                            onChange={handleChange('employerName')}
                            required
                        />
                        <Typography variant="subtitle1">Sick Leave</Typography>
                        <TextField
                            label="Start Date"
                            type="date"
                            value={formData.sickLeaveStart}
                            onChange={handleChange('sickLeaveStart')}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="End Date"
                            type="date"
                            value={formData.sickLeaveEnd}
                            onChange={handleChange('sickLeaveEnd')}
                            InputLabelProps={{ shrink: true }}
                        />
                    </>
                )}

                <Button type="submit" variant="contained" color="primary">
                    Submit Entry
                </Button>
            </Box>
        </Paper>
    );
};

export default HospitalEntryForm;
