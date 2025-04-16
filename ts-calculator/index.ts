import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculator, Operation } from './calculator';
import { exerciseCalculator } from './exerciseCalculator';


function isArrayofNumbers(value: unknown): boolean {
    return Array.isArray(value) && value.every(element => typeof element === 'number');
}

type ExerciseRequest = {
    daily_exercises: number[];
    target: number;
};

const app = express();

app.use(express.json());


app.post('/exercises', (req: Request<unknown, unknown, ExerciseRequest>, res) => {

    const { daily_exercises, target } = req.body;

    // availability
    if (!target || !daily_exercises) {
        res.status(400).send({ error: 'parameters missing' });
        return;
    }

    // format validation
    if (isNaN(Number(target)) || !isArrayofNumbers(daily_exercises)) {
        res.status(400).send({ error: 'malformatted parameters' });
        return;
    }

    // calculation
    const result = exerciseCalculator(
        daily_exercises, target
    );

    res.send({ result });

});

app.post('/calculate', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { value1, value2, op } = req.body;

    if (!value1 || isNaN(Number(value1))) {
        res.status(400).send({ error: '...' });
        return;
    }

    const result = calculator(
        Number(value1), Number(value2), op as Operation
    );

    res.send({ result });
});

app.get('/bmi', (req: Request, res: Response): void => {

    const { height, weight } = req.query;

    // Convert height and weight to numbers
    const heightInCm = parseFloat(height as string);
    const weightInKg = parseFloat(weight as string);

    if (isNaN(heightInCm) || isNaN(weightInKg)) {
        res.status(400).json({
            error: "malformatted parameters"
        });
        return;
    }

    calculateBmi(heightInCm, weightInKg);

    res.json({
        'weight': weightInKg,
        'height': heightInCm,
        'bmi': calculateBmi(heightInCm, weightInKg)
    });
});

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});