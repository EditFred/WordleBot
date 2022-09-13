import React, {useState, useEffect} from 'react';
import {createRoot} from 'react-dom/client'

// import {
//     BrowserRouter as Router,
//     Route,
//     Routes
//   } from 'react-router-dom';
import SubmitTarget from './components/SubmitTarget';


const App = () => {

    return (
        <div>
            <SubmitTarget></SubmitTarget>
        </div>
    )
}

const toRender = document.getElementById('app')
const root = createRoot(toRender)
root.render(<App />)