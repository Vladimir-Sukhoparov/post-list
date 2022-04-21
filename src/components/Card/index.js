import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import api from '../../utils/api'

import { Card as CardMUI } from '@mui/material'

import Typography from '@mui/material/Typography'

import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'

//import Link from '@mui/material/Link'
import Avatar from '@mui/material/Avatar'

import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';

import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'

import dayjs from 'dayjs'

import style from './index.module.css'

const divStyle = {
    padding: '13px',
    color: '#1976d2',
    fontSize: '16px',
}

export const Card = ({ itemPost, isInFavorites, setFavorites }) => {
    const [textLike, setTextLike]=useState(itemPost.likes.length)
     
    const writeLS = (key, value) => {
        const storage = JSON.parse(localStorage.getItem(key)) || [];
        storage.push(value);

        localStorage.setItem(key, JSON.stringify(storage));
    };

    const removeLS = (key, value) => {
        const storage = JSON.parse(localStorage.getItem(key));
        const filteredStorage = storage.filter((itemID) => value !== itemID);
        localStorage.setItem(key, JSON.stringify(filteredStorage));
    };

    const addFavorite = () => {
        writeLS('favorites', itemPost._id);
        setFavorites((prevState) => [...prevState, itemPost._id]);
        
        api.addLike(itemPost._id)
            .then((addedItem) => {
                setTextLike(addedItem.likes.length)
            })
            .catch(() => {
                alert('Не удалось поставить лайк');
            });
    };

    const removeFavorite = () => {
        removeLS('favorites', itemPost._id);
        setFavorites((prevState) => prevState.filter((itemID) => itemPost._id !== itemID));
        api.deleteLike(itemPost._id)
            .then((removedItem) => {
                setTextLike(removedItem.likes.length)
            })
            .catch(() => {
                alert('Не удалось удалить лайк');
            });
    };


    return (
        <CardMUI sx={{ maxWidth: 345 }}>
            <ListItem>
            <Link to={`posts/${itemPost._id}`}>{itemPost.title}</Link>


                {/* <Link style={divStyle} href='#' underline='hover' variant='body2'>
                    {itemPost.title}
                </Link> */}
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemAvatar>
                    <Avatar src={itemPost.author?.avatar} />
                </ListItemAvatar>
                <Typography gutterBottom variant='body2' component='div'>
                    {itemPost.author?.email}
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
                </Typography>
            </ListItem>
            <ListItem>
                <Timeline>
                    <TimelineItem>
                        <TimelineOppositeContent style={{ maxWidth: '1px', paddingLeft: '0px', paddingRight: '0px' }} />
                        <TimelineSeparator>
                            <TimelineDot variant='outlined' color='primary' />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography gutterBottom variant='body2' component='div'>
                                {dayjs(itemPost.created_at).format('DD.MM.YYYY, HH:mm:ss')};
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineOppositeContent style={{ maxWidth: '1px', paddingLeft: '0px', paddingRight: '0px' }} />

                        <TimelineSeparator>
                            <TimelineDot variant='outlined' color='success' />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography gutterBottom variant='body2' component='div'>
                                Last edit{dayjs(itemPost.updated_at).format(' DD.MM.YYYY, HH:mm:ss')};
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </ListItem>
            <ListItem>
            
            {isInFavorites ? (
                        <IconButton aria-label='add to favorites' onClick={removeFavorite}>
                            <FavoriteIcon sx={{ color: red[500] }}  />
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
           {/*  {isInFavorites ? (
                        <IconButton aria-label='add to favorites' onClick={removeFavorite}>
                            <FavoriteIcon />
                            <Typography gutterBottom variant='body2' component='div'>
                    {itemPost.likes.length}
                </Typography>
                        </IconButton>
                    ) : (
                        <IconButton aria-label='add to favorites' onClick={addFavorite}>
                            <FavoriteBorderOutlinedIcon />
                            <Typography gutterBottom variant='body2' component='div'>
                    {itemPost.likes.length}
                </Typography>
                        </IconButton>
                    )} */}
                
                
                    </ListItem>
        </CardMUI>
    )
}
