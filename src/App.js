import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import { useApi } from './hooks/useApi'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { List } from './components/List'
import { InfoUser } from './components/InfoUser'
import { HeadLinks } from './components/HeadLinks'
import { Logo } from './components/Logo'
import { Toolbar } from './components/Toolbar'
import '@fontsource/roboto'
import { PostPage } from './components/PostPage'
import { Post } from './components/Post'

import UserContext from './contexts/userContext'
import ModalContext from './contexts/modalContext'
import FormModalContext from './contexts/formModalContext';

import './index.css'
import AlertModal from './components/Modal'
import { Search } from './components/Search'
import { useLocalStorage } from './hooks/useLocalStorage'
import { FormModal } from './components/FormModal'

export const App = () => {
    const api=useApi()
    const [postList, setPostList] = useState([])
    const { readLS } = useLocalStorage()
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(12)
    const [favorites, setFavorites] = useState(readLS('favorites') || [])

    const [modalState, setModalState] = useState({
        isOpen: false,
        msg: null,
    })

    const [modalFormState, setModalFormState] = useState({
        isOpen: false,
        msg: null,
    });

    const token = readLS('token')
    useEffect(()=>{
        if(!token){
            setModalFormState(()=>{
                return{
                    isOpen: true,
                    msg: 'Вы не авторизированы',
                }
            })
        }
    },[])

    const [user, setUser] = useState(null)

    useEffect(() => {
      if(token){
        api.getPost()
            .then((list) => setPostList(list))
            .catch((err) => alert(err))}
    }, [user])

    useEffect(() => {
        if(token){
              api.getInfoUser()
            .then((user) => setUser(user))
            .catch((err) => alert(err))}

    }, [])

    const indexOfLastPosts = currentPage * postsPerPage
    const indexOfFirstPosts = indexOfLastPosts - postsPerPage
    const currentPosts = postList.slice(indexOfFirstPosts, indexOfLastPosts)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <ModalContext.Provider value={{ modalState, setModalState }}>
            <FormModalContext.Provider value={{ modalFormState, setModalFormState }}>
                <div className='appContainer'>
                    <AlertModal />
                    <FormModal />
                    <Header>
                        <Logo />
                        <Search setPostList={setPostList} token={token}/>
                        <InfoUser />
                        <HeadLinks />
                    </Header>
                    <div className='content container'>
                        <Routes>
                            <Route
                                path='/'
                                element={
                                    <div>
                                        <Toolbar changeList={setPostList} />

                                        <div className='content__cards'>
                                            <List list={currentPosts} favorites={favorites} setFavorites={setFavorites} />

                                            <PostPage postsPerPage={postsPerPage} totalPosts={postList.length} paginate={paginate} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                                        </div>
                                    </div>
                                }
                            />

                            <Route path='posts/:itemID' element={<Post user={user?._id} changeList={setPostList} />} />

                            <Route path='about' element={<div>Page About</div>} />
                        </Routes>
                    </div>

                    <Footer />
                </div>
                </FormModalContext.Provider>
            </ModalContext.Provider>
        </UserContext.Provider>
    )
}
