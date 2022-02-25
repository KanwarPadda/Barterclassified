import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import LoadingComponent from "../layout/LoadingComponent";
import {fetchCategoriesAsync} from "../../Redux/reducers/categorySlice";
import {projectFireStore} from "../../firestore/config";

const CategoryTable = () => {

    const {loading,categories} = useSelector(state => state.category);

    const dispatch = useDispatch();

    useEffect(async () => {
const unsubscribe = await projectFireStore.collection('Categories').onSnapshot(()=>{
    dispatch(fetchCategoriesAsync())
})
        return () => unsubscribe;
    }, [dispatch]);




    if (loading) return <LoadingComponent/>
    return (
        <div>
            {categories.length}
        </div>
    );
};

export default CategoryTable;
