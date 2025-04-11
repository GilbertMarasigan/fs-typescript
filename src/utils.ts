import { z } from 'zod';
import { NewPatientEntry, Gender } from "./types";

export const newEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string().optional(),
    gender: z.nativeEnum(Gender),
    occupation: z.string()
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    return newEntrySchema.parse(object);
};

export default toNewPatientEntry;
