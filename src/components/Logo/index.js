import React from 'react'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'


export const Logo = () => {
    
    return (
        <div >
            <Typography gutterBottom variant='h4' component='div'>
              <Link to='/' >  Мой сайт </Link>
            </Typography>
        </div>
    )
}
