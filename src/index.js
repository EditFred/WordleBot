import React, {useState, useEffect} from 'react';
import {createRoot} from 'react-dom/client'

// import {
//     BrowserRouter as Router,
//     Route,
//     Routes
//   } from 'react-router-dom';
import SubmitTarget from './components/SubmitTarget';
import Guesses from './components/Guesses'


const App = () => {
    const [guesses, setGuesses] = useState([])



    return (
        <div>
            <SubmitTarget
            setGuesses={setGuesses}></SubmitTarget>
            {guesses[0] ? 
            guesses.map((word, index) => {
                return(
                <Guesses 
                word={word}
                index={index}></Guesses>)
            })
             : <>bye</>}
        </div>
    )
}

const toRender = document.getElementById('app')
const root = createRoot(toRender)
root.render(<App />)