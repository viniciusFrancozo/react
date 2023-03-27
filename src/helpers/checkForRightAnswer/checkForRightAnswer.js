import helpers from "helpers"





const testWord = ({guess, answer, times}) => {
    if (false){
        return true
    } else{
        var splitGuess = guess.split('')
        var guessAnswerRelationArray = Array.from(Array(times), () => new Array()) //array que receberá o número 0 caso a letra não exista na palavra, 1 caso esteja no lugar errado e 2 se estiver no lugar certo
        for (var n = 0; n < times; n++){
            var splitAnswer = answer[n].toString().split('')
            if (answer[n] == guess){
                guessAnswerRelationArray[n].push(true)
            }else {
                splitGuess.forEach((letter, index) => {
                    //se o array de resposta incluir a "letter" (letra da tentativa), o if em seguida verificará se ela está ou não na posição correta
                    if(splitAnswer.includes(letter)){
                        //verificar em qual(is) index(es) se encontra a letra mapeada "letter" nos arrays de resposta e de tentativa
                        var guessLetterIndexList = helpers.checkLetter({letter: letter, wordInArray: splitGuess})
                        var asnwerLetterIndexList = helpers.checkLetter({letter: letter, wordInArray: splitAnswer})
                        for (var i of guessLetterIndexList){
                            if (guessLetterIndexList.length >= asnwerLetterIndexList.length){
                                guessAnswerRelationArray[n].push(
                                    //helper para contar as ocorrências corretamente
                                    helpers.checkMultipleAnswers(
                                        {
                                            guessArray: guessLetterIndexList, 
                                            answerArray: asnwerLetterIndexList, 
                                            index: index
                                        }
                                    )
                                )
                                break
                            }else {
                                if (asnwerLetterIndexList.includes(i)){
                                    //se o "i" (index na qual a "letter" está presente no array de tentativa) estiver presente no array de resposta, é adicionado 2 à lista
                                    guessAnswerRelationArray[n].push(2)
                                }else{
                                    //se não, é adicionado 1
                                    guessAnswerRelationArray[n].push(1)
                                }
                            }
                        }
                    }else{
                        //caso o comentário do if(splitAnswer.includes(letter)) seja negativo, a "letter" não existe na resposta
                        guessAnswerRelationArray[n].push(0)
                    }
                })
            }
        }
        return guessAnswerRelationArray
    }
}

export default testWord