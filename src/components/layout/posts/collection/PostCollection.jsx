import React from 'react';
import {Button} from "semantic-ui-react";
import './PostCollectionStyles.scss'
import {Link} from "react-router-dom";

const PostCollection = ({post}) => {
    return (
        <div className='collection-item'>

            <div className='image'
                 style={{backgroundImage: `url(${post.post_photo}`}}/>
            <div className='collection-footer'>
                <span className='name'>{post.title}</span>
                <span className='price'>{post.price}</span>
            </div>
            <Button as={Link} to={`/details/${post.id}`} content={'show Details'.toUpperCase()}
                    className={'custom-button'}/>
        </div>
    );
};


export default PostCollection;

