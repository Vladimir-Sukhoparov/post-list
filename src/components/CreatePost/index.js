import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../utils/api'

export const CreatePost = () => {
    const navigate=useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        const {
            target: { inputTitle, inputText },
        } = event
        api.addPost({
            title: inputTitle.value,
            text: inputText.value,
           
        })
            .then((data) => {
            console.log(data),

                navigate('/')
            })
            .catch((err) => alert(err))
    }
    return (
        <form onSubmit={handleSubmit}>
            <input name='inputTitle' placeholder='title' />
            <input name='inputText' placeholder='text' />
            
            <button>Создать пост</button>
        </form>
    )
}