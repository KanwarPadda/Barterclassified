import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import LoadingComponent from "../layout/LoadingComponent";
import {fetchCategoriesAsync} from "../../Redux/reducers/categorySlice";

const CategoryTable = () => {
    // const categories = useSelector(state => state.category.category);
    const {loading,categories} = useSelector(state => state.category);

    const dispatch = useDispatch();

    useEffect(async () => {

        await dispatch(fetchCategoriesAsync())
    }, []);


    if (loading) return <LoadingComponent/>
    return (
        <div>
            {categories.length}
        </div>
    );
};

export default CategoryTable;
