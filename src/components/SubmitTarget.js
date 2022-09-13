import React,{useState} from 'react';
import { dothis, solveWord, start } from '../mechanics/Filter';

const SubmitTarget = () => {
    const [userInput, setUserInput] = useState('');
    const [guess1, setGuess1] = useState('')


    const handleSubmit = (event) =>{
        event.preventDefault()
        //console.log('guess1',guess1)
        solveWord(userInput.toUpperCase(), guess1)
    }

    return (
        <form>
            <input value = {userInput} placeholder='Word to Guess' onChange={(event) => {
                setUserInput(event.target.value)
            }}></input>
            <input value = {guess1} placeholder='User Guess' onChange={(event) => {
                setGuess1(event.target.value)
            }}></input>
            <button onClick={(event) => handleSubmit(event)}>Solve!</button>
            <button onClick={(event) =>{
                event.preventDefault()
                start()
            }}>Start</button>
        </form>
    )
}
export default SubmitTarget