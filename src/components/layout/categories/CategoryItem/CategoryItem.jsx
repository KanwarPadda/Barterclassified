import React from 'react';
import './cateogryItemStyles.scss'
import {Link} from "react-router-dom";

const CategoryItem = ({title, photo, size, id}) => {
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

                <Link className='subtitle' to={`/posts/${id}`}>BARTER NOW</Link>
            </div>
        </div>
    );
};


export default CategoryItem;
