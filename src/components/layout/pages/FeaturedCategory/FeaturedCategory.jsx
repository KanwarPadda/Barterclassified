import React, {useEffect} from 'react';
import './featuredCategoryStyles.scss';
import CategoryItem from "../../categories/CategoryItem/CategoryItem";
import {useDispatch, useSelector} from "react-redux";
import LoadingComponent from "../../LoadingComponent";
import {projectFireStore} from "../../../../firestore/config";
import {fetchCategoriesAsync} from "../../../../Redux/reducers/categorySlice";
import Directory from "../../directory/Directory";


const FeaturedCategory = () => {
    const {categories, loading} = useSelector(state => state.category);
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = projectFireStore.collection('Categories').onSnapshot(() => {
            dispatch(fetchCategoriesAsync());
        })
        return () => {
            unsubscribe();
        }
    }, [dispatch])



    if (loading) return <LoadingComponent content={'loading categories'}/>

    return (
        <div className={'homepage'}>
            <Directory categories={categories}/>

        </div>
    );
};

export default FeaturedCategory;
