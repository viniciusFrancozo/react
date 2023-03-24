import { Print } from "@mui/icons-material"
import helpers from "helpers"


const testWord = ({guess, answer}) => {
    if (guess == answer){
        return (
            <></>
        )
    }else{
        var splitAnswer = answer.toString().split('')
        var splitGuess = guess.split('')
        var guessAnswerRelationArray = [] //array que receberá o número 0 caso a letra não exista na palavra, 1 caso esteja no lugar errado e 2 se estiver no lugar certo
        splitGuess.forEach(letter => {
            if(splitAnswer.includes(letter)){
                //verificar se a letra está no index certo, se estiver, retornar true
                var guessLetterIndexList = helpers.checkLetter({letter: letter, wordInArray: splitGuess})
                var asnwerLetterIndexList = helpers.checkLetter({letter: letter, wordInArray: splitAnswer})

                for (let i of guessLetterIndexList){
                    console.log(asnwerLetterIndexList)
                    if (guessLetterIndexList.length > asnwerLetterIndexList.length){
                        if (asnwerLetterIndexList.includes(i) && asnwerLetterIndexList.indexOf(i) == 0){
                            guessAnswerRelationArray.push(2)
                        }else if (asnwerLetterIndexList.includes(i) && asnwerLetterIndexList.indexOf(i) != 0){
                            guessAnswerRelationArray.pop()
                            guessAnswerRelationArray.push(2)

                        }else{
                            guessAnswerRelationArray.push(1)
                        }
                    }else {
                        if (asnwerLetterIndexList.includes(i)){
                            guessAnswerRelationArray.push(2)
                        }else{
                            guessAnswerRelationArray.push(1)
                        }
                    }
                }
            }else{
                guessAnswerRelationArray.push(0)
            }
        })
        return guessAnswerRelationArray
    }
}

export default testWord