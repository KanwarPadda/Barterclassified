import React from 'react';
import {useSelector} from "react-redux";

const CategoryTable = () => {
    const categories = useSelector(state => state.category.category);


    return (
        <div>
            {/*{categories.map(category => {*/}
            {/*        return <p>{category.title}</p>;*/}
            {/*        p*/}
            {/*    }*/}
            {/*)}*/}
        </div>
    );
};

export default CategoryTable;
