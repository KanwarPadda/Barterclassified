import React from 'react';
import './cateogryItemStyles.scss'

const CategoryItem = ({title,photo,size}) => {
    return (
        <div className={`${size} menu-item`}>
            <div
                className='background-image'
                style={{
                    backgroundImage: `url(${photo})`
                }}
            />
            <div className='content'>
                <h1 className='title'>{title.toUpperCase()}</h1>
                <span className='subtitle'>BARTER NOW</span>
            </div>
        </div>
    );
};


export default CategoryItem;
