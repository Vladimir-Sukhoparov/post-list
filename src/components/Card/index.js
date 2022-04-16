import React from 'react'

import api from '../../utils/api'

import { Card as CardMUI } from '@mui/material'

import Typography from '@mui/material/Typography'

import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'

import Link from '@mui/material/Link'
import Avatar from '@mui/material/Avatar'

import Divider from '@mui/material/Divider'

import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import style from './index.module.css'

const theme = createTheme({
    palette: {
        primary: {
            main: '#fed700;',
        },
        secondary: {
            main: '#FF0000',
        },
    },
})

const divStyle = {
    padding: '13px',
    color: '#1976d2',
    fontSize: '16px',
}

export const Card = ({ itemPost, isInFavorites, setFavorites }) => {
    const writeLS = (key, value) => {
        const storage = JSON.parse(localStorage.getItem(key)) || []
        storage.push(value)
        localStorage.setItem(key, JSON.stringify(storage))
    }

  /*   const removeLS = (key, value) => {
        const storage = JSON.parse(localStorage.getItem(key))
        const filteredStorage = storage.filter((itemID) => value !== itemID)
        localStorage.setItem(key, JSON.stringify(filteredStorage))
    }

    const addFavorite = () => {
        writeLS('favorites', itemPost._id)
        setFavorites((prevState) => [...prevState, itemPost._id])
        api.addLike(itemPost._id)
            .then((addedItem) => {
                alert(`${addedItem.name} добавлен в избраное`)
            })
            .catch(() => {
                alert('Не удалось добавить')
            })
    }

    const removeFavorite = () => {
        removeLS('favorites', itemPost._id)
        setFavorites((prevState) => prevState.filter((itemID) => itemPost._id !== itemID))
        api.deleteLike(itemPost._id)
            .then((removedItem) => {
                alert(`${removedItem.name} удален из избраного`)
            })
            .catch(() => {
                alert('Не удалось удалить')
            })
    } */

    return (
        <ThemeProvider theme={theme}>
            <CardMUI sx={{ maxWidth: 345 }}>
                <ListItem>
                    <Link style={divStyle} href='#' underline='hover' variant='body2'>
                        {itemPost.title}
                    </Link>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src={itemPost.author.avatar} />
                    </ListItemAvatar>
                    <Typography gutterBottom variant='body2' component='div'>
                        {itemPost.author.email}
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography gutterBottom variant='body2' component='div'>
                        {itemPost.text}
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography gutterBottom variant='body2' component='div'>
                        Tags:
                        {itemPost.tags.map((item, i) => (
                            <span key={i} className={style.tags}>
                                {item}
                            </span>
                        ))}
                        {/*  <span> { itemFood.tags } </span> */}
                    </Typography>
                </ListItem>
                <ListItem className={style.listItem}>
                    <Timeline className={style.data}>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot variant='outlined' color='primary' />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                            <Typography gutterBottom variant='body2' component='div'>
                       {itemPost.created_at}
                    </Typography>
                            </TimelineContent>
                        </TimelineItem>

                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot variant='outlined' color='success' />
                            </TimelineSeparator>
                            <TimelineContent>
                            <Typography gutterBottom variant='body2' component='div'>
                            {itemPost.updated_at}
                    </Typography>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </ListItem>
            </CardMUI>
        </ThemeProvider>
    )
}
