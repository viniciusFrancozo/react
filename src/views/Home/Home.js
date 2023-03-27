import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from "service/api"
import { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';

const Home = () => {
    const [words, setWords] = useState([])
    const [loading, setLoading] = useState(true)
    const [tipButton, setTipButton] = useState(true)

    const callApi = async () => {
        const response = await api.get('/word', {params: {number: 30000}})
        const filteredResponse = response?.data.filter((word) => word.length === 5)
        setWords(filteredResponse)
        window.localStorage.setItem('WORDS_FROM_API_CALL', JSON.stringify(filteredResponse))
        setLoading(false)
    }

    const handleTipButton = () => setTipButton(false)

    useEffect(() => {
        if (tipButton === false){
            callApi()
        }
    }, [tipButton])

    useEffect(() => {
        const data = window.localStorage.getItem('WORDS_FROM_API_CALL')
        if (data !== null){
            setWords(JSON.parse(data))
            setLoading(false)
        }
    }, [])

    return (
        <>  
            <Typography sx={{display: 'flex', justifyContent: 'center'}}>
                <Button onClick={handleTipButton}>Click</Button> 
                <p>to display all possible words</p>
            </Typography>
            {words && (
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Words</TableCell>
                            <TableCell align="right">Displayed&nbsp;(times)</TableCell>
                            <TableCell align="right">Win&nbsp;(%)</TableCell>
                            <TableCell align="right">Likes</TableCell>
                            <TableCell align="right">Dislikes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {words.map((word) => (
                            <TableRow
                            key={word}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {word}
                                </TableCell>
                                <TableCell align="right">{Math.floor(Math.random() * 500)}</TableCell>
                                <TableCell align="right">{Math.floor(Math.random() * 100)}</TableCell>
                                <TableCell align="right">{Math.floor(Math.random() * 1000)}</TableCell>
                                <TableCell align="right">{Math.floor(Math.random() * 1000)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            )}
        </>
    )
    
}

export default Home