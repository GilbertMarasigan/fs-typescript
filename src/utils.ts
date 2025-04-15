import { z } from 'zod';
import { NewPatientEntry, Gender, healthCheckRating } from "./types";

export const newEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string().optional(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
});

// Shared base schema (no id)
const BaseEntrySchema = z.object({
    description: z.string(),
    date: z.string().refine(d => !isNaN(Date.parse(d)), { message: "Invalid date format" }),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
});

// HealthCheckEntry
const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.nativeEnum(healthCheckRating),
});

// OccupationalHealthcareEntry
const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: z
        .object({
            startDate: z.string(),
            endDate: z.string(),
        })
        .optional(),
});

// HospitalEntry
const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: z.object({
        date: z.string(),
        criteria: z.string(),
    }),
});

export const EntryWithoutIdSchema = z.discriminatedUnion("type", [
    HealthCheckEntrySchema,
    OccupationalHealthcareEntrySchema,
    HospitalEntrySchema,
]);

// TypeScript type from schema
export type EntryWithoutId = z.infer<typeof EntryWithoutIdSchema>;



export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    return newEntrySchema.parse(object);
};

export default toNewPatientEntry;
