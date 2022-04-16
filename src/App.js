import React, { useEffect, useState } from 'react'

import api from './utils/api'


import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { List } from './components/List'

import './index.css'
import { Info } from './components/Info'
import { HeadLinks } from './components/HeadLinks'
import { Logo } from './components/Logo'
import { Toolbar } from './components/Toolbar'

export const App = () => {
    const [postList, setPostList] = useState(null)

    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || [])

    useEffect(() => {
        api.getPost().then((list) => setPostList(list))
    }, [])

    return (
        <div className='appContainer'>
            <Header>
                <Logo />
                <HeadLinks />
               
            </Header>
            <Toolbar/>
            <div className='content container'>
                <div className='content__cards'>
                    <List list={postList} favorites={favorites} setFavorites={setFavorites} />
                    <Info favorites={favorites} />
                </div>
            </div>
            <Footer />
        </div>
    )
}
