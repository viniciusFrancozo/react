import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useRef } from 'react';



const WordPanel = ({word}) => {
    const utilRowClasses = ['u-Rclass-01', 'u-Rclass-02', 'u-Rclass-03', 'u-Rclass-04', 'u-Rclass-05', 'u-Rclass-06']
    const utilColClasses = ['u-Cclass-01', 'u-Cclass-02', 'u-Cclass-03', 'u-Cclass-04', 'u-Cclass-05']
    const divRef = useRef(null)
    return (
        <Container>
            {
                utilRowClasses.map((Rclass) => (
                    <Box className={Rclass} sx={{display: 'flex', justifyContent: 'center'}}>
                        {
                            utilColClasses.map((Cclass) => <Typography ref={divRef} className={Cclass} sx={{
                                width: '4rem',
                                minHeight: '4.5rem',
                                height: 'fit-content',
                                backgroundColor: '#968d8c',
                                textAlign: 'center',
                                fontSize: '3rem',
                                margin: '3px',
                                borderRadius: '5px',
                            }}>{word}</Typography>)
                        }
                    </Box>
                ))
                
            }
        </Container>
    )
}

export default WordPanel