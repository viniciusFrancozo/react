import { useState, useEffect } from "react";
import { Navbar, WordForm } from "components";
import api from "../../service/api";
import { Typography } from "@mui/material";


const Termo = () => {
    
    const [words, setWord] = useState()
    const getWords = async () => {
        const response = await api.get('/word', {params: {length: 5}})
        setWord(response?.data)
    }
    
    useEffect(() => {
        getWords()
    },[])
    
    
    return(
        <>
            {<Navbar/>}
            {words}
            {<WordForm answer={words}/>}
        </>
    )
}
export default Termo