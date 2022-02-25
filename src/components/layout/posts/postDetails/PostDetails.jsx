import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {projectFireStore} from "../../../../firestore/config";
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../../../../Redux/reducers/productSlice";
import LoadingComponent from "../../LoadingComponent";
import PostUserInfo from "../PostUser/PostUserInfo";

const PostDetails = () => {
    const {loading, product} = useSelector(state => state.product);
    const {id} = useParams();
    const dispatch = useDispatch();
    useEffect(async () => {
        const unSubscribe = await projectFireStore.collection('Posts').onSnapshot(() => {
            dispatch(getProduct({id}));
        })
        return () => unSubscribe();
    }, [dispatch, id]);


    if (loading) return <LoadingComponent/>;

    return (
        <div>
            <PostUserInfo userId={product.user_id}/>

        </div>
    );
};

export default PostDetails;
