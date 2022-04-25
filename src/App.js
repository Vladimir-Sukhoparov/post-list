import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import api from './utils/api'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { List } from './components/List'
import { InfoUser } from './components/InfoUser'
import { HeadLinks } from './components/HeadLinks'
import { Logo } from './components/Logo'
import { Toolbar } from './components/Toolbar'
import "@fontsource/roboto"
import { PostPage } from './components/PostPage'
import { Post } from './components/Post'
import { EditPost } from './components/EditPost'

import './index.css'

export const App = () => {
    const [postList, setPostList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(12)
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || [])

    const [user, setUser] = useState(null)

    useEffect(() => {
        api.getPost()
            .then((list) => setPostList(list))
            .catch((err) => alert(err))
    }, [])

    useEffect(() => {
        api.getInfoUser()
            .then((user) => setUser(user))
            .catch((err) => alert(err))
    }, [])
   

    const indexOfLastPosts = currentPage * postsPerPage
    const indexOfFirstPosts = indexOfLastPosts - postsPerPage
    const currentPosts = postList.slice(indexOfFirstPosts, indexOfLastPosts)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className='appContainer'>
            <Header>
                <Logo />
                <InfoUser name={user?.name} />
                <HeadLinks />
            </Header>
            
            <div className='content container'>
                <Routes>
                
                    <Route
                        path='/'
                        element={<div>
                             <Toolbar />
                           
                            <div className='content__cards'>
                            
                                <List list={currentPosts} favorites={favorites} setFavorites={setFavorites} />

                                <PostPage postsPerPage={postsPerPage} totalPosts={postList.length} paginate={paginate} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                            </div>
                            </div>
                        }
                    />

                    <Route path='posts/:itemID' element={<Post user={user?._id}/>} />
                    {/* <Route path='posts/create' element={<CreatePost />} /> */}
                    <Route path='posts/:itemID/edit' element={<EditPost />} />
                    <Route path='about' element={<div>Page About</div>} />
                </Routes>
            </div>

            <Footer />
        </div>
    )
}
