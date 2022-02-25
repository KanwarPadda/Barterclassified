import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import LoadingComponent from "../LoadingComponent";
import {projectFireStore} from "../../../firestore/config";
import {getProducts} from "../../../Redux/reducers/productSlice";
import PostCollection from "./collection/PostCollection";

const Posts = () => {

    let {id} = useParams();
    const {loading, products} = useSelector(state => state.product);
    console.log(id)
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = projectFireStore.collection('Products').onSnapshot(() => {
            dispatch(getProducts({id}))
        })
        return () => unsubscribe();
    }, [dispatch, id]);

    if (loading) return <LoadingComponent/>
    if (products.length === 0) return 'nothing found';

    return (
        <>
            <div>
                <h1>Page</h1>
            </div>
            <br/>
        <div>
            {products.map(product => <PostCollection key={product.id} post={product}/>)}
        </div>
        </>
    );
};

export default Posts;
