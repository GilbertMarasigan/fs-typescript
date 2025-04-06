
interface bmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow((height / 100), 2)

  let category;
  if (bmi < 18.5) {
    category = 'Underweight'
  }
  else if (bmi >= 18.5 && bmi <= 24.9) {
    category = 'Normal'
  }
  else if (bmi >= 25 && bmi <= 29.9) {
    category = 'Overweight'
  }
  else {
    category = 'Obese'
  }

  console.log(category)
  return `${category} range`

}

try {
  const { height, weight } = parseArguments(process.argv);
  calculateBmi(height, weight)
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}