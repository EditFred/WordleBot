
import everyWord from './EveryWord'
import Plurals from './Plurals'
import optimalGuess from './SecondGuess'


let incorrectLetterArrArr = [[], [], [], [], []]
let correctLetterArrArr = [[], [], [], [], []]
let inValidLetters = []
let validLetters = []
let currentValidWords = []
//create every word array
const startGame = () =>{
    currentValidWords = []
    for(let i = 0; i< everyWord.length; i++){
        currentValidWords.push(everyWord[i])
    }
    incorrectLetterArrArr = [[], [], [], [], []]
    correctLetterArrArr = [[], [], [], [], []]
    inValidLetters = []
    validLetters = []
    knownValids = []
    remainLettObj = {}
}
//screen for eliminated letters
const clearInvLetters = (word) => {
    for(let i = 0; i<inValidLetters.length; i++){
        if(word.includes(inValidLetters[i])){
            return false
        }
    }
    return true
}
//screen for correct letters in the wrong place 
const clearInvLetPlace = (word) => {
    
    for(let i = 0; i< 5; i++){
        let thisArr = []
        const thisLetter = word[i]
        for(let j = 0; j<incorrectLetterArrArr[i].length;j++){thisArr.push(incorrectLetterArrArr[i][j])}
        if(thisArr.includes(thisLetter)){
            return false
        }
    }
    return true    
}
//screen for words with correct letters in correct place
const passValidLetterPlace = (word) => {
    for(let i = 0;i<5;i++){
        let correctLetter;
        if(correctLetterArrArr[i]){correctLetter = correctLetterArrArr[i][0]}
        if(correctLetter && correctLetter !== word[i]){
            return false
        }
    }
    return true
}
//screen for words with correct letters in the wrong place
const passValidLetters = (word) => {
    for(let i = 0; i<validLetters.length;i++){
        if(!word.includes(validLetters[i])){
            return false
        }
    }
    return true
}
//check each word for filters
const filterInvWords = (guessNumber, target) =>{
    let newWordList = [];
    for(let i = 0; i<currentValidWords.length;i++){
        const thisWord = currentValidWords[i]
        if(clearInvLetters(thisWord) && clearInvLetPlace(thisWord) && passValidLetters(thisWord) && passValidLetterPlace(thisWord)){
            newWordList.push(thisWord)
            if(guessNumber ===0){fillRemainingLettObj(thisWord, target)}
        }
    }
    currentValidWords = newWordList
}

const noDoubles = (word) => {
    let wordArr=[]
    for(let i = 0; i<5;i++){
        if(wordArr.includes(word[i])){
            console.log('tried ', word)
            return false
        }else{
            wordArr.push(word[i])
        }
    }
    return true
}
//choose random word from remaining choices, this will be smarter after everything else is done
const chooseWord = (guessNumber) => {
    let wordFound = false
    let guessWord ;
    while(!wordFound){
        const guessNum = Math.floor(Math.random() * currentValidWords.length)
        guessWord = currentValidWords[guessNum]
       if(!Plurals.includes(guessWord)){
        if(guessNumber > 1 || noDoubles(guessWord)){
            wordFound = true

        }
       }
    }
    return guessWord
}

//check word for accuracy against the target word(answer)
const processGuessResult = (guessWord, targetWord) => {
    let matchWord = targetWord   
    for(let i = 0; i< 5; i++){
        if(guessWord[i] === matchWord[i]){
            if(!knownValids.includes(guessWord[i])){
                knownValids.push(guessWord[i]);
            }
            if(!correctLetterArrArr[i][0]){
                correctLetterArrArr[i].push(guessWord[i])
                
            }
            if(!validLetters.includes(matchWord[i])){validLetters.push(matchWord[i])}
            matchWord = matchWord.slice(0,i) + '-' + matchWord.slice(i+1)
        }
    }
    for(let i = 0; i<5; i++){
        if(matchWord.includes(guessWord[i])){
            if(!knownValids.includes(guessWord[i])){
                knownValids.push(guessWord[i]);
            }
            if(targetWord[i]!==guessWord[i]){
            incorrectLetterArrArr[i].push(guessWord[i])}
            validLetters.push(guessWord[i])
        }else if(!validLetters.includes(guessWord[i])){
            inValidLetters.push(guessWord[i])
        }else if(targetWord.includes(guessWord[i]) && matchWord[i]!==guessWord[i] && matchWord[i]!== '-'){
            incorrectLetterArrArr[i].push(guessWord[i])
        }
    }
}
let knownValids = []
//find common remaining letters that aren't guaranteed
let remainLettObj = {}
const fillRemainingLettObj = (word) => {
    // THIS NEEDS WORK FOR REAL
    for(let i = 0; i<5; i++){
        const lett = word[i]
        const objCount = remainLettObj[lett]
        if(!knownValids.includes(lett)){//needs to be not valid letters
            if(objCount || objCount === 0){
                remainLettObj[lett] = objCount+1;
            }else{
                remainLettObj[lett] = 0
            }
        }
    }
}


const solveWord= (target, userGuess) =>{
    startGame()
    let solved = false;
    let guessNum = 0
    let guesses = []
    while(!solved){
        let guess;
        if(guessNum === 0 && userGuess){
            guess = userGuess
        }else if(guessNum === 1){
            guess = optimalGuess(remainLettObj, currentValidWords)
        }else{
        guess = chooseWord(guessNum)}

        console.log(`Guess ${guessNum + 1}: ${guess}`)
        guesses.push(guess)
        
        
        if(guess === target){solved= true}
        else{
            processGuessResult(guess, target)
            filterInvWords(guessNum, target)
        }
        if(currentValidWords.length<40){
        console.log('remaining words: ',currentValidWords)
    }
        guessNum++
    }
    return guesses
}
const testObj = {a:2, b:4, c:3, d:9, e:0, g:45}
const start = () =>{
    //console.log('tests', topFour(remainLettObj))
    // console.log('validSTART',validLetters)
    // console.log('validarrarr', correctLetterArrArr)
    // console.log('invalid', inValidLetters)
    // console.log('invalidarrarr', incorrectLetterArrArr)
    console.log(knownValids)
    console.log(remainLettObj)
}


export {solveWord, start}