import React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Link from '@mui/material'

export const PostPage = ({postsPerPage, totalPosts, currentPage,setCurrentPage}) => {
    const pageNumber = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumber.push(i)
    }

    
    return (
        <div>
           
            <Stack spacing={2}>
{
    !!pageNumber &&(
        <Pagination 
count={pageNumber.length} 
                page={currentPage}
                onChange={(_,num)=>setCurrentPage(num)}
                

        />
    )
}
           
            </Stack>
        </div>
    )
}
