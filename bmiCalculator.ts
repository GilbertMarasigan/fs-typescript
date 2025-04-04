

const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / Math.pow((height / 100) , 2)
    console.log('bmi', bmi)
    let category;
    if(bmi < 18.5){
        category = 'Underweight'
    }
    else if(bmi >= 18.5 && bmi <= 24.9){
        category = 'Normal'
    }
    else if(bmi >= 25 && bmi <= 29.9){
        category = 'Overweight'
    }
    else{
        category = 'Obese'
    }
    return `${category} range`
   
}

console.log(calculateBmi(180, 74))