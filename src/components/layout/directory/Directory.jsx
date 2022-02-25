import React from 'react';
import './directory.styles.scss';
import CategoryItem from "../categories/CategoryItem/CategoryItem";

const Directory = ({categories}) => {
    return (
        <div className={'directory-menu'}>
            {categories.map(({photo,id,title,size})=>(
                <CategoryItem key={id} title={title} photo={photo} id={id}  size={size}/>
                )
            )}
        </div>
    );
};

export default Directory;
