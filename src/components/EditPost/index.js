import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Grid, TextField, Button, Typography } from '@mui/material'
import api from '../../utils/api'

export const EditPost = () => {
    const params = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [tags, setTags] = useState('')

    const handleClick = () => {
        api.editPost(params.itemID, {
            title,
            text,
            tags,
        })
            .then((data) => {
                navigate('/')
            })
            .catch((err) => alert(err))
    }

    useEffect(() => {
        api.getPost(params.itemID).then((data) => {
            setTitle(data.title)
            setText(data.text)
            setTags(data.tags)
        })
    }, [])

    return (
        <Grid container flexDirection='column' spacing='10'>
            <Grid item>
                <Typography variant='h3'>Редактировать пост</Typography>
            </Grid>
            <Grid item>
                <TextField
                    label='Название'
                    variant='outlined'
                    value={title}
                    onChange={({ target }) => {
                        setName(target.value)
                    }}
                />
            </Grid>
            <Grid item>
                <TextField
                    label='Описание'
                    variant='outlined'
                    value={text}
                    onChange={({ target }) => {
                        setDesciption(target.value)
                    }}
                />
            </Grid>
            <Grid item>
                <TextField
                    label='Тэг'
                    variant='outlined'
                    value={tags}
                    onChange={({ target }) => {
                        setPrice(target.value)
                    }}
                />
            </Grid>
            <Grid item>
                <Button onClick={handleClick} variant='contained' color='secondary' size='small'>
                    Сохранить
                </Button>
            </Grid>
        </Grid>
    )
}
