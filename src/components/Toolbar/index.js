import React, { useState, useContext } from 'react'

import ModalContext from '../../contexts/modalContext'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import HomeIcon from '@mui/icons-material/Home'
import { emphasize, styled } from '@mui/material/styles'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import style from './index.module.css'
import api from '../../utils/api'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

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

export const Toolbar = ({changeList}) => {
    const {setModalState} = useContext(ModalContext)
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const {
            target: { inputImage, inputTitle, inputText, inputTags },
        } = event
        if(inputImage.value.length!==0 && inputTitle.value.length!==0 && inputText.value.length!==0 && inputTags.value.length!==0){
        api.addPost({
            image: inputImage.value.trim(),
            title: inputTitle.value.trim(),
            text: inputText.value.trim(),
            tags: inputTags.value.trim().split(','),
        })
            .then((data) => {
                changeList((prevState)=>[...prevState, data])
                {
                    handleClose
                }
            })
            .catch(() => 
            setModalState(()=>{
                return {
                    isOpen: true,
                    msg: 'Не удалось добавить пост'
                }
            }))
    } else {setModalState(()=>{
        return {
            isOpen: true,
            msg: 'Заполните все поля'
        }
    }); handleClickOpen()}}
    return (
        <div className={style.toolbar}>
            <Breadcrumbs aria-label='breadcrumb'>
                <StyledBreadcrumb component='a' href='#' label='Главная' icon={<HomeIcon fontSize='small' />} />
                <StyledBreadcrumb component='a' href='#' label='Все посты' />
            </Breadcrumbs>
            <div className={style.createPost}>
                <div>
                    <Typography gutterBottom variant='h6' component='div'>
                        Добро пожаловать на мою страничку
                    </Typography>
                    <br />
                    <Typography gutterBottom variant='body2' component='div'>
                        Мы рады, что вы здесь. 🥳
                    </Typography>
                </div>
                <div>
                    <BootstrapButton onClick={handleClickOpen} variant='contained' disableRipple>
                        Создать пост
                    </BootstrapButton>
                    <Dialog open={open} onClose={handleClose}>
                        <form onSubmit={handleSubmit}>
                            <DialogTitle>Создание поста</DialogTitle>
                            <DialogContent>
                                <DialogContentText>Заполните все поля</DialogContentText>
                                <TextField margin='dense' name='inputImage' label='URL картинки' fullWidth variant='standard' />
                                <TextField margin='dense' name='inputTitle' label='Название' fullWidth variant='standard' />
                                <TextField margin='dense' name='inputText' label='Описание' fullWidth variant='standard' />
                                <TextField margin='dense' name='inputTags' label='Укажите тэги через запятую' fullWidth variant='standard' />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Отмена</Button>
                                <Button type='submit' onClick={handleClose}>
                                    Создать пост
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}
