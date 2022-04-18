import React from 'react';
import { Card } from '../Card';
import './index.css';

export const List = ({ list, favorites, setFavorites }) => {
    
    return (
        <div className='cards'>
            {list?.map((item) => (
                <Card
                    key={item._id}
                    itemPost={item}
                    
                    isInFavorites={favorites.includes(item._id)}
                    
                    setFavorites={setFavorites}
                />
            ))}
        </div>
    );
};
