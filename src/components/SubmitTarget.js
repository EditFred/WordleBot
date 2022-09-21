import React,{useState} from 'react';
import { dothis, solveWord, start } from '../mechanics/Filter';

const SubmitTarget = ({setGuesses}) => {
    const [userInput, setUserInput] = useState('');
    const [guess1, setGuess1] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


    const handleSubmit = (event) =>{
        event.preventDefault()
        //console.log('guess1',guess1)
        setErrorMessage('')
        if(userInput.length === 5){
            setGuesses(solveWord(userInput.toUpperCase(), guess1))   
        }else{
            setErrorMessage("Word must be 5 letters in length")
        }
    }

    return (
        <div>
            <form>
                <input value = {userInput} placeholder='Word to Guess' onChange={(event) => {
                    setUserInput(event.target.value)
                }}></input>
                {/* <input value = {guess1} placeholder='User Guess' onChange={(event) => {
                    setGuess1(event.target.value)
                }}></input> */}
                <button onClick={(event) => handleSubmit(event)}>Solve!</button>
                <button onClick={(event) =>{
                    event.preventDefault()
                    start()
                }}>Ignore this Button</button>
            </form>
            <div style={{color:'red'}}>{errorMessage}</div>
        </div>
        
    )
}
export default SubmitTarget