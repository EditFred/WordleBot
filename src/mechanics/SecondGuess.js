const vowels = ['A','E','I','O','U']



const remainLettObj = {}
const fillRemainingLettObj = (word, targetWord) => {
    // THIS NEEDS WORK FOR REAL
    for(let i = 0; i<5; i++){
        const lett = word[i]
        const objCount = remainLettObj[lett]
        if(!targetWord.includes(lett)){
            if(objCount || objCount === 0){
                remainLettObj[lett] = objCount+1;
            }else{
                remainLettObj[lett] = 0
            }
        }
    }
}

const topFour = (obj) => {
    let populars = [{x : 0},{x : 0},{x : 0},{x : 0}];
    for(const letter in obj){
        const lett = letter;
        if(obj[lett] > Object.values(populars[0])[0]){
            populars[3] = populars[2];
            populars[2] = populars[1];
            populars[1] = populars[0];
            populars[0] = {};
            populars[0][lett] = obj[lett];
        }else if(obj[lett] > Object.values(populars[1])[0]){
            populars[3] = populars[2]
            populars[2] = populars[1]
            populars[1] = {}
            populars[1][lett] = obj[lett]
        }else if(obj[lett] > Object.values(populars[2])[0]){
            populars[3] = populars[2];
            populars[2] = {};
            populars[2][lett] = obj[lett];
        } else if(obj[lett] > Object.values(populars[3])[0]){
            populars[3] = [];
            populars[3][lett] = obj[lett];
        }
    }
    const topLetters = [Object.keys(populars[0])[0],Object.keys(populars[1])[0],Object.keys(populars[2])[0],Object.keys(populars[3])[0]]

    return topLetters
}

const containsLetters = (word, commonArray, lengt) => {
    for(let i = 0; i < lengt; i++){
        if(!word.includes(commonArray[i])){
            return false
        }
    }
    return true
}

const optimalGuess = (obj, remainingWords) => {
    const commonArr = topFour(obj);
    console.log('topfour',commonArr)
    for(let i = 0; i< remainingWords.length; i++){
        if(containsLetters(remainingWords[i], commonArr, 4)){
            return remainingWords[i]
        }
    }
    for(let i = 0; i< remainingWords.length; i++){
        if(containsLetters(remainingWords[i], commonArr, 3)){
            return remainingWords[i]
        }
    }
    for(let i = 0; i< remainingWords.length; i++){
        if(containsLetters(remainingWords[i], commonArr, 2)){
            return remainingWords[i]
        }
    }

    console.log("NO WORDS FOUND")
    return("CLEAN")
}

const testObj = {a:2, b:4, c:3, d:9, e:0, g:45}


export default optimalGuess