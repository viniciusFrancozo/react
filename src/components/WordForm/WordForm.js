import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup'
import helpers from "helpers";
import { TextField } from "@mui/material";
import { Container } from "@mui/system";

const WordForm = ( {answer, onInputSubmission, onGuessResult, attempts} ) => {
    const [inputValue, setInputValue] = useState()
    const ref = useRef()

    const schema = yup.object().shape( {
        Word: yup.string().min(5).max(5).required(),
    })

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    })
    
    const onSubmit = (data) => {
        const result = helpers.testWord({guess: data.Word, answer: answer, times: answer.length})
        setInputValue(data.Word)
        onInputSubmission(data.Word)
        onGuessResult(result)
        ref.current.value = ''
    }

    return (
        <Container sx={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField 
                    id="standard-basic" 
                    inputRef={ref}
                    name="wordInput" 
                    label="Enter a 5 letter word" 
                    variant="standard" 
                    {...register("Word")}
                />
            </form>
        </Container>
    )
}

export default WordForm