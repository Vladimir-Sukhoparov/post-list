import React from 'react';
import { Card } from '../Card';
import './index.css';

export const List = ({ list, favorites }) => {
    
    return (
        <div className='cards'>
            {list?.map((item) => (
                <Card
                    key={item._id}
                    itemPost={item}
                   
                    
                    
                   favorites={favorites}
                />
                
            ))}
            
        </div>
    );
};
