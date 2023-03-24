import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import helpers from "helpers";

const WordForm = ( {answer} ) => {
    const schema = yup.object().shape( {
        Word: yup.string().min(5).max(5).required(),
    })
    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    })
    
    const onSubmit = (data) => {
        var guessResult = helpers.testWord({guess: data.Word, answer: answer})
        console.log(guessResult)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type='text' {...register("Word")}/>
        </form>
    )
}

export default WordForm