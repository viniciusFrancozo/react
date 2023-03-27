//esse helper foi criado para retornar corretamente casos onde a resposta contêm mais de uma letra igual, por exemplo:
//se a resposta fosse "rural", a letra R aparece 2x. Isso implica que, caso eu tente a palavra fictícia "rooor", o array
//"guessAnswerRelationArray" (checkForRightAnswer.js) deve retornar [2,0,0,0,1].

const checkMultipleAnswers = ({guessArray, answerArray, index}) => {
    var result = 0
    answerArray.forEach((element) => {
        //nesse caso, o forEach percorrerá o array de indexes da resposta
        if (guessArray.includes(element) && index == element){
            result = 2
        }else if (!guessArray.includes(element) && index >= Math.min(...guessArray) && result != 2){
            result = 1
        }
    });
    return result
}

export default checkMultipleAnswers

