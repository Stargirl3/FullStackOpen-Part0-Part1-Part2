import React from 'react'

//renders header
const Header = ({ course }) => <h2>{course.name}</h2>

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

export default Course