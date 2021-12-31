import React, { useState } from 'react'


//component for displaying the page headings
const Display = ({ title }) => <h1>{title}</h1>


//component for rendering the feedback buttons
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

//returns a message that no feedback has yet to be given
const NoStatistics = ({ text, counter }) => {
  if (counter === 0) return <p>{text}</p>
  else return null
}

//component that renders the feedback results, if feedback has been given
const Statistics = ({ feedback, text, counter }) => {
  if (counter !== 0) return <p>{text} {feedback}</p>
  else return null
}


//main App component
const App = () => {
  //the 3 feedback buttons
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  //the headings
  const heading1 = 'give feedback'
  const heading2 = 'statistics'

  //calculates the total amount of feedback given
  const totalFeedback = () => good + neutral + bad

  //calculates the average score from the total amount of feedback
  // in the range of 1 to -1
  const averageScore = () => ((good * 1) + (neutral * 0) + (bad * -1)) / totalFeedback()


  //calculates the percent of positive feedback given
  const percentOfGoodFeedback = () => (good / totalFeedback()) * 100


  return (
    <div>
      <Display title={heading1} />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Display title={heading2} />
      <NoStatistics text='No feedback given' counter={totalFeedback()} />
      <Statistics feedback={good} text='good' counter={totalFeedback()} />
      <Statistics feedback={neutral} text='neutral' counter={totalFeedback()} />
      <Statistics feedback={bad} text='bad' counter={totalFeedback()} />
      <Statistics feedback={totalFeedback()} text='all' counter={totalFeedback()} />
      <Statistics feedback={averageScore()} text='average' counter={totalFeedback()} />
      <Statistics feedback={percentOfGoodFeedback() + '%'} text='positive' counter={totalFeedback()} />
    </div>
  )
}


export default App

