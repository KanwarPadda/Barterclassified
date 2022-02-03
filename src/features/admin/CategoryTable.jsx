import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loadCategories} from "../../app/store/categorySlice";
import LoadingComponent from "../../app/layout/LoadingComponent";

const CategoryTable = () => {
    // const categories = useSelector(state => state.category.category);
    const {loading} = useSelector(state => state.async);
    console.log(loading)
    const dispatch = useDispatch();


    if (loading) return <LoadingComponent/>
    return (
        <div>
            test
        </div>
    );
};

export default CategoryTable;
