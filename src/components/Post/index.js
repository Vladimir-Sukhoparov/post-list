import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../utils/api'

import Grid from '@mui/material/Grid'
import { Button, Divider, List, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'

import dayjs from 'dayjs'

import style from './index.module.css'

export const Post = (user) => {
    const [item, setItem] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    const handleClick = () => {
        api.deletePost(params.itemID)
            .then((data) => {
                console.log(data)
                navigate('/')
            })
            .catch((err) => console.log(err))
    }

    const navigateToEditPage = () => {
        navigate(`edit`)
    }

    useEffect(() => {
        api.getPost(params.itemID)
            .then((data) => setItem(data))
            .catch((err) => alert(err))
    }, [])

    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Button href='/' variant='outlined' sx={{ mb: 1 }}>
                Назад
            </Button>
            <>
                {item && (
                    <Grid container spacing={2}>
                        <Grid item xs={7}>
                            <img
                                style={{
                                    maxHeight: 500,
                                    maxWidth: 500,
                                }}
                                src={item?.image}
                                alt='picture'
                            />
                        </Grid>
                        <Grid item container xs={5}>
                            <Grid item xs={12}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar src={item.author?.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText primary={<Typography variant='body1'>{item.author?.name}</Typography>} secondary={dayjs(item.created_at).format('DD.MM.YYYY')} />
                                </ListItem>
                                <ListItem>
                                    {item.author._id == user.user && <EditIcon onClick={navigateToEditPage} sx={{ ml: 1, mr: 1 }} />}
                                    {item.author._id == user.user && <DeleteIcon fontSize='small' onClick={handleClickOpen} sx={{ ml: 1, mr: 1 }} />}

                                    <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
                                        <DialogTitle id='alert-dialog-title'>Вы действительно хотите удалить свой пост? </DialogTitle>

                                        <DialogActions>
                                            <Button onClick={handleClose}>Отмена</Button>
                                            <Button onClick={handleClick}>Удалить</Button>
                                        </DialogActions>
                                    </Dialog>

                                    <Typography gutterBottom variant='body2' component='div' sx={{ ml: 1, mr: 1 }}>
                                        {item.tags.map((item, i) => (
                                            <span key={i} className={style.tags}>
                                                {item}
                                            </span>
                                        ))}
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography variant='body1'>{item.title}</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography variant='body1'>{item.text}</Typography>
                                </ListItem>
                            </Grid>

                            <Grid item xs={12}>
                                {item.comments.map((item, i) => (
                                    <List key={i}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar src={item.author?.avatar} />
                                            </ListItemAvatar>
                                            <ListItemText primary={<Typography variant='body1'>{item.author}</Typography>} secondary={dayjs(item.created_at).format('DD.MM.YYYY')} />
                                        </ListItem>

                                        <Typography variant='body1'>{item.text}</Typography>
                                        <Divider />
                                    </List>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </>
        </div>
    )
}
