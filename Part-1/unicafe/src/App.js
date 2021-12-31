import React, { useState } from 'react'


//component for displaying the page headings
const Display = ({ title }) => <h1>{title}</h1>


//component for rendering the feedback buttons
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

//component that renders the feedback results
const Statistics = ({ feedback, text }) => <p>{text} {feedback}</p>


//main App component
const App = () => {
  //the 3 feedback buttons
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  //the headings
  const heading1 = 'give feedback'
  const heading2 = 'statistics'

  const totalFeedback = () => good + neutral + bad

  const averageScore = () => {
    if (totalFeedback() === 0) return 0
    else return ((good * 1) + (neutral * 0) + (bad * -1)) / totalFeedback()
  }

  const percentOfGoodFeedback = () => {
    if (totalFeedback() === 0) return 0
    else return (good / totalFeedback()) * 100
  }

  return (
    <div>
      <Display title={heading1} />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Display title={heading2} />
      <Statistics feedback={good} text='good' />
      <Statistics feedback={neutral} text='neutral' />
      <Statistics feedback={bad} text='bad' />
      <Statistics feedback={totalFeedback()} text='all' />
      <Statistics feedback={averageScore()} text='average' />
      <Statistics feedback={percentOfGoodFeedback() + '%'} text='positive' />
    </div>
  )
}


export default App

