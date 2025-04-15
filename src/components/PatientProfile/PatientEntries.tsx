import { Entry } from '../../types';
import EntryDetail from './EntryDetail';

const PatientEntries = ({ patientEntries }: { patientEntries: Entry[] }) => {

    return (
        patientEntries.map((entry: Entry, index: number) => (
            <EntryDetail key={index} entry={entry} />
        )
        )
    );

};

export default PatientEntries;