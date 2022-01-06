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

//renders above components
const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content course={course} />
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
      }
    ]
  }

  return <Course course={course} />
}

export default App