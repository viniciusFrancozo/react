const checkLetter = ({letter, wordInArray}) => {
    var results = [];
    var idx = wordInArray.indexOf(letter);
    while (idx != -1) {
        results.push(idx);
        idx = wordInArray.indexOf(letter, idx + 1);
    }
    return results;
}

export default checkLetter