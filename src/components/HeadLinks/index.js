import React from 'react'
import Link from '@mui/material/Link'

const divStyle = {
    paddingRight: '20px',
}

export const HeadLinks = () => {
    return (
        <div>
            <Link style={divStyle} href="#" underline="hover" variant="body2">Home</Link>

            <Link style={divStyle} href="#" underline="hover" variant="body2">Home Docs</Link>

            <Link href="#" underline="hover" variant="body2">GitHub</Link>
        </div>
    )
}
