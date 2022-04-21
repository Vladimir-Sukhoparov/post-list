import React from 'react'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import HomeIcon from '@mui/icons-material/Home'
import { emphasize, styled } from '@mui/material/styles'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import style from './index.module.css'

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor = theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800]
    
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    }
})
const BootstrapButton = styled(Button)({
    textTransform: 'none',
})


export const Toolbar = () => {
    const navigate=useNavigate()
    return (
        <div className={style.toolbar}>
            <Breadcrumbs aria-label='breadcrumb'>
                <StyledBreadcrumb component='a' href='#' label='Home' icon={<HomeIcon fontSize='small' />} />
                <StyledBreadcrumb component='a' href='#' label='All posts' />
            </Breadcrumbs>
            <div className={style.createPost}>
                <div>
                    <Typography gutterBottom variant='h6' component='div'>
                        Welcome to Our Image Board!
                    </Typography>
                    <br />
                    <Typography gutterBottom variant='body2' component='div'>
                        We're stoked that you're here. 🥳
                    </Typography>
                </div>
                <div>
                    <BootstrapButton
                        variant='outlined'
                        onClick={() => {
                            navigate('/posts/create')
                        }}
                    >
                        Create post
                    </BootstrapButton>
                </div>
            </div>
        </div>
    )
}
