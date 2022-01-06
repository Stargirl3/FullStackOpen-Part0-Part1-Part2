import React from 'react'

//renders header
const Header = ({ course }) => <h1>{course.name}</h1>

//uses map() to render array items via the Part component
const Content = ({ course }) => (
  <>
    {course.parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </>
)

//renders the array object properties
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

//calculates and renders total sum of exercises
const Total = ({ course }) => {
  const total = course.parts.reduce((sum, item) => {
    return sum + item.exercises
  }, 0)
  return (
    <h4>total of {total} exercises</h4>
  )
}

//renders above components
const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </>
)

//main app
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App