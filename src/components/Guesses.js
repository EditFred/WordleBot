import React from 'react';

const Guesses = ({word, index}) => {

    return(
        <div>
            Guess {index + 1}: {word}
        </div>
    )
}

export default Guesses