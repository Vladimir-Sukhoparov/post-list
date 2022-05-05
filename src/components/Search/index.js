import React, { useEffect, useState } from 'react'
import './index.css'
import api from '../../utils/api'

export const Search = ({ setPostList }) => {
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        api.getPost()
            .then((list) => setPostList(list.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()))))
            .catch((err) => alert(err))
    }, [searchText])

    return (
        <div className='search'>
            <input type='text' placeholder='Поиск' className='search__input' onChange={(event) => setSearchText(event.target.value)} />
        </div>
    )
}
