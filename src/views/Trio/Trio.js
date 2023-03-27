import { useState, useEffect } from "react";
import { Navbar, WordForm, WordPanel } from "components";
import api from "../../service/api";
import { Container } from "@mui/system";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Link } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Trio = () => {
    const gameTimes = [...Array(3).keys()]
    
    const [victoryCondition, setVictoryCondition] = useState([...Array(gameTimes.length).keys()].fill(false));
    const [words, setWord] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [attempts, setAttempts] = useState(1)
    const [guessResult, setGuessResult] = useState()
    const [open, setOpen] = useState(false);
    const [gameState, setGameState] = useState()

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    const handleInputSubmission = (value) => {
        setInputValue(value)
    }

    const handleGuessResult = (value) => {
        setGuessResult(value)
    }

    const getWords = async () => {
        for (let _ in gameTimes){
            const response = await api.get('/word', {params: {length: 5}})
            setWord(words => [...words, response?.data])
            console.log(response?.data)
        }
    }
    
    useEffect(() => {
        getWords()
        
    }, [])

    useEffect(() => {
        
        if (!gameState){
            if (attempts <= 7) {
                guessResult?.forEach((element, wordBoxindex) => {
                    if (victoryCondition[wordBoxindex] !== true){
                        inputValue.split('').map((letter, index) => {
                            
                            document.styleSheets[0].insertRule(`.word-box-${wordBoxindex+1} > div > .u-Rclass-0${attempts} > .u-Cclass-0${index+1}::after {
                                content: "${letter}";
                                display: block;
                                background-color: ${element[index] === 0 ? 'inherit' : element[index] === 1 ? '#f0b833' : '#6ac728'};
                                width: inherit;
                                height: inherit;
                                border-radius: inherit;
                            }`)
                        })
                        if (element[0] === true) {
                            setVictoryCondition((prev) => {
                                const copy = [...prev];
                                copy[wordBoxindex] = true;
                                return copy;
                            });
                        }
                    }
                }); 
            }      
            if (inputValue) {
                setAttempts((prevAttempts) => prevAttempts + 1)
            }
        }
    }, [inputValue])

    useEffect(() => {
        console.log(attempts)
        if ((attempts == 7 && victoryCondition.every((value) => value === true)) || victoryCondition.every((value) => value === true)){
            setGameState(true)
            handleOpen()
            console.log(attempts,'tet')
        }else if (attempts == 7){
            setGameState(false)
            handleOpen()
         } 
    }, [victoryCondition, attempts])
    
    return(
        <Container>
            <Navbar/>
            <Container sx={{display: 'flex', justifyContent: 'center'}}>
                {gameTimes.map((element) => (
                    <Box className={`word-box-${element+1}`}>
                        <WordPanel/>
                    </Box>
                ))}
            </Container>
            <WordForm answer={words} onInputSubmission={handleInputSubmission} onGuessResult={handleGuessResult} attempts={attempts} />

            <div>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Fade in={open}>
                  <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        {gameState === true ? (<p>Parabéns</p>) : (<p>Que pena...</p>)}
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        {gameState === true ? (<p>Você conseguiu, você acertou as palavras!!</p>) : (<p>Você não conseguiu acertar :/</p>)}
                    </Typography>
                  </Box>
                </Fade>
              </Modal>
            </div>
        </Container>
    )
}
export default Trio