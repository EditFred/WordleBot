const vowels = ['A','E','I','O','U']

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

const testObj = {a:2, b:4, c:3, d:9, e:0, g:45}


export default topFour