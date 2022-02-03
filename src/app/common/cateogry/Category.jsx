import React, {memo, useCallback, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {categorySelectors, fetchSingleCategory} from "../../store/categorySlice";
import LoadingComponent from "../../layout/LoadingComponent";

const Category = () => {

    const {loading} = useSelector(state=>state.category)
    let {id} = useParams()
    const dispatch = useDispatch()
    const test = useCallback(async ()=>{
        await dispatch(fetchSingleCategory({id}));
    },[id,dispatch])


    useEffect(async () => {
        await test();
    }, [test]);



    if (loading) return <LoadingComponent/>

    return (
        <div>
            test


        </div>
    );
};

Category.prototype = {}

export default memo(Category);
