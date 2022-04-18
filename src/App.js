import React, { useEffect, useState } from 'react'

import api from './utils/api'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { List } from './components/List'
import { Info } from './components/Info'
import { HeadLinks } from './components/HeadLinks'
import { Logo } from './components/Logo'
import { Toolbar } from './components/Toolbar'

import './index.css'
import { Pagination } from '@mui/material'
import { PostPage } from './components/PostPage'


export const App = () => {
    const [postList, setPostList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(12)

    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || [])

    
    const [user, setUser]=useState(null)
   
    useEffect(() => {
        api.getPost().then((list) => setPostList(list))
       
    }, [])

    useEffect(()=>{
        api.getInfoUser().then((user)=>setUser(user))
    },[])

    const indexOfLastPosts = currentPage * postsPerPage
    const indexOfFirstPosts = indexOfLastPosts - postsPerPage
    const currentPosts = postList.slice(indexOfFirstPosts, indexOfLastPosts)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    useEffect(()=>{
        api.showLikes().then((likes)=>setFavorites(likes))
    },[])

    return (
        <div className='appContainer'>
            <Header>
                <Logo />
                <Info name={user?.name}/>
                <HeadLinks />
            </Header>
            <Toolbar />
            <div className='content container'>
                <div className='content__cards'>
                    <List list={currentPosts} favorites={favorites}/>
                </div>
            </div>
            
            <PostPage postsPerPage={postsPerPage} totalPosts={postList.length} paginate={paginate} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            <Footer />
        </div>
    )
}
