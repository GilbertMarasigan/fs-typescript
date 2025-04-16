export interface ExerciseCalculation {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseExerciseArguments = (args: string[]): { target: number; period: number[] } => {
    if (args.length < 3) throw new Error('Not enough arguments provided. Expected at least 2.');

    // Convert all arguments to numbers
    const numericArgs = args.map(arg => {
        const num = Number(arg);
        if (isNaN(num)) throw new Error(`Invalid argument: '${arg}' is not a number.`);
        return num;
    });

    const [target, ...period] = numericArgs;

    return { target, period };
};

export const exerciseCalculator = (period: Array<number>, target: number): ExerciseCalculation => {
    const periodLength = period.length;
    const trainingDays = period.filter(p => p !== 0).length;
    const sum = period.reduce((acc, val) => acc + val, 0);
    const average = sum / periodLength;
    const rating = Math.round(average);
    const success = target <= average;
    let ratingDescription;

    if (rating >= 3) {
        ratingDescription = 'optimal';
    } else if (rating < 3 && rating >= 2) {
        ratingDescription = 'not too bad but could be better';
    } else {
        ratingDescription = 'bad';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

try {
    if (require.main === module) {
        const { target, period } = parseExerciseArguments(process.argv.slice(2));
        console.log(exerciseCalculator(period, target));
    }
} catch (error) {
    console.error(error.message);
}
