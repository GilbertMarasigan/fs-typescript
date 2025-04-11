
interface HeaderProps {
  courseName: string;
}

interface CoursePart {
  name: string,
  exerciseCount: number
}

interface CoursePartProps {
  courseParts: CoursePart[]
}

const Header = ({ courseName }: HeaderProps) => {
  return <h1>{courseName}</h1>
}

const Content = ({ courseParts }: CoursePartProps) => {

  return (<div>
    {
      courseParts.map((part, index) =>
        <p key={index}>{part.name} {part.exerciseCount}</p>
      )
    }
  </div>)
}

const Total = ({ totalExercises }: { totalExercises: number }) => {
  return (
    <p>
      Number of exercises {totalExercises}
    </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  )
}

export default App