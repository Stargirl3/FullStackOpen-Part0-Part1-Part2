import React, { useState } from 'react'

//displays headings
const DisplayTitle = ({ title }) => <h1>{title}</h1>

//displays the random anecdote
const DisplayQuote = ({ quote }) => <p>"{quote}"</p>

//displays most voted anecdote after the first vote has been cast
const DisplayMostVotedQuote = ({ quote, votesOfQuote }) => {
  if (votesOfQuote > 1) {
    return (
      <>
        <p>"{quote}" </p>
        <p> with {votesOfQuote} votes </p>
      </>
    )
  } else if (votesOfQuote === '1') {
    return (
      <>
        <p>"{quote}" </p>
        <p> with {votesOfQuote} vote</p>
      </>
    )
  } else return <p>No votes</p>
}

//displays buttons, their text and executes a function onClick
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

//main app
const App = () => {

  //page headings
  const heading1 = 'Anecdote Of The Day'
  const heading2 = 'Most Voted Anecdote'

  //array with anecdotes
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  //the current index of the anecdotes array 
  const [selected, setSelected] = useState(0)

  //the keys are the indexes of each quote of the anecdotes array and the values are their corresponding votes
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
  })

  //they key indicates the index of the most voted quote and the value corresponds to the number of votes the quote has
  const [mostVotes, setMostVotes] = useState({})

  //updates the votes object with every new vote cast and updates the mostVotes object with the most voted anecdote
  const handleVote = () => {
    const updatedVotes = {
      ...votes,
      [selected]: votes[selected] + 1
    }

    setVotes(updatedVotes)


    if (updatedVotes[selected] > Object.values(mostVotes).toString()) {
      const mostVotedAnecdote = {
        [selected]: updatedVotes[selected]
      }
      setMostVotes(mostVotedAnecdote)
    }
  }

  //generates a random index for the anecdotes array each time the user presses 'next anecdote'
  const newRandomIndex = () => setSelected(Math.floor(Math.random() * anecdotes.length))




  return (
    <div>
      <DisplayTitle title={heading1} />
      <DisplayQuote quote={anecdotes[selected]} />
      <Button
        handleClick={handleVote}
        text='vote'
      />
      <Button
        handleClick={newRandomIndex}
        text='next anecdote'
      />
      <DisplayTitle title={heading2} />
      <DisplayMostVotedQuote quote={anecdotes[Object.keys(mostVotes).toString()]} votesOfQuote={Object.values(mostVotes).toString()} />

    </div>
  )
}

export default App
