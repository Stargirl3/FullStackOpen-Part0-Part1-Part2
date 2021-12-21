import React from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <p>
        <Part part={props.part1} exercises={props.exercises1} />
      </p>
      <p>
        <Part part={props.part2} exercises={props.exercises2} />
      </p>
      <p>
        <Part part={props.part2} exercises={props.exercises2} />
      </p>
    </> 
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part}{props.exercises}
      </p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </>
  )
}


const App = () => {
  const course = 'Half Stack application development '
  const part1 = { 
    name:'Fundementals of React ',
    exercises: 10
  }

  const part2 = {
    name: 'Using props to pass data ',
    exercises: 7
  }

  const part3 = {
    name: 'State of a component ',
    exercises: 14
  }

  return (
    <>
      <Header course={course} />
      <Content 
        part1={part1.name} exercises1={part1.exercises}
        part2={part2.name} exercises2={part2.exercises}
        part3={part3.name} exercises3={part3.exercises}  
      />  
      <Total 
        exercises1={part1.exercises} 
        exercises2={part2.exercises} 
        exercises3={part3.exercises} 
      />
    </>
  )
}

export default App