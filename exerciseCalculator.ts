interface ExerciseCalculation { 
    periodLength: number;
    trainingDays: number
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }

const exerciseCalculator = (period: Array<number>, target: number): ExerciseCalculation => {
    // 1 - needs improvement
    // 2 - not too bad but could be better
    // 3 - optimal
    const periodLength = period.length;
    const trainingDays = period.filter(p => p !== 0).length
    const sum = period.reduce((acc, val) => acc + val, 0)
    const average = sum / periodLength
    const rating = Math.round(average)
    const success = target <= average 
    let ratingDescription 

    if(rating >= 3) {
        ratingDescription = 'optimal'
    }
    else if(rating < 3 && rating >= 2){
        ratingDescription = 'not too bad but could be better'
    }
    else{
        ratingDescription = 'needs improvement'
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    }
}

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))