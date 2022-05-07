import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import ModalContext from '../../contexts/modalContext'

import { useApi } from '../../hooks/useApi'

import { Card as CardMUI } from '@mui/material'
import { Typography } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import { red } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ListItemText from '@mui/material/ListItemText'
import CommentIcon from '@mui/icons-material/Comment'

import dayjs from 'dayjs'

import style from './index.module.css'

const divStyle = {
    padding: '13px',
    color: '#1976d2',
    fontSize: '16px',
}

export const Card = ({ itemPost, isInFavorites, setFavorites }) => {
    const api= useApi()
    const [textLike, setTextLike] = useState(itemPost.likes.length)
    const {setModalState} = useContext(ModalContext)

    const writeLS = (key, value) => {
        const storage = JSON.parse(localStorage.getItem(key)) || []
        storage.push(value)

        localStorage.setItem(key, JSON.stringify(storage))
    }

    const removeLS = (key, value) => {
        const storage = JSON.parse(localStorage.getItem(key))
        const filteredStorage = storage.filter((itemID) => value !== itemID)
        localStorage.setItem(key, JSON.stringify(filteredStorage))
    }

    const addFavorite = () => {
        writeLS('favorites', itemPost._id)
        setFavorites((prevState) => [...prevState, itemPost._id])

        api.addLike(itemPost._id)
            .then((addedItem) => {
                setTextLike(addedItem.likes.length)
            })
            .catch(() => {
                setModalState(() => {
                    return {
                        isOpen: true,
                        msg: 'Не удалось поставить лайк',
                    }
                })
            })
    }

    const removeFavorite = () => {
        removeLS('favorites', itemPost._id)
        setFavorites((prevState) => prevState.filter((itemID) => itemPost._id !== itemID))
        api.deleteLike(itemPost._id)
            .then((removedItem) => {
                setTextLike(removedItem.likes.length)
            })
            .catch(() => {
                setModalState(() => {
                    return {
                        isOpen: true,
                        msg: 'Не удалось удалить лайк'
                    }
                })
            })
    }

    return (
        <CardMUI sx={{ width: 310, margin: 1 }}>
            <div className={style.card}>
                <div>
                    <div>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src={itemPost.author?.avatar} />
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant='body1'>{itemPost.author?.name}</Typography>} secondary={<Typography variant='body2'>{itemPost.author?.about}</Typography>} />
                        </ListItem>
                        <Divider />
                    </div>

                    <img src={itemPost?.image} alt='picture' />

                    <div className={style.body}>
                        <ListItem>
                            <Link to={`posts/${itemPost._id}`}>{itemPost.title}</Link>
                        </ListItem>
                    </div>

                    <div>
                        <ListItem sx={{ alignItems: 'flex-start' }}>
                            <p className={style.p}> {itemPost.text}</p>
                        </ListItem>
                    </div>

                    <div>
                        <ListItem>
                            <Typography gutterBottom variant='body2' component='div'>
                                Tags:
                                {itemPost.tags.map((item, i) => (
                                    <span key={i} className={style.tags}>
                                        {item}
                                    </span>
                                ))}
                            </Typography>
                        </ListItem>
                    </div>
                </div>
                <div className={style.footer}>
                    <ListItem>
                        <ListItemText secondary={dayjs(itemPost.created_at).format('DD.MM.YYYY')} sx={{ ml: 1 }} />

                        {itemPost.comments.length > 0 && (
                            <>
                                <CommentIcon fontSize='small' sx={{ ml: 1 }} color='disabled' />
                                <ListItemText secondary={itemPost.comments.length} />
                            </>
                        )}

                        {isInFavorites ? (
                            <IconButton aria-label='add to favorites' onClick={removeFavorite}>
                                <FavoriteIcon sx={{ color: red[500] }} />
                                <Typography gutterBottom variant='body2' component='div'>
                                    {textLike}
                                </Typography>
                            </IconButton>
                        ) : (
                            <IconButton aria-label='add to favorites' onClick={addFavorite}>
                                <FavoriteBorderOutlinedIcon />
                                <Typography gutterBottom variant='body2' component='div'>
                                    {textLike}
                                </Typography>
                            </IconButton>
                        )}
                    </ListItem>
                </div>
            </div>
        </CardMUI>
    )
}
