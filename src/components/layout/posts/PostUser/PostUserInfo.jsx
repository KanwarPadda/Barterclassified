import React, {useEffect} from 'react';
import {projectFireStore} from "../../../../firestore/config";
import {useDispatch, useSelector} from "react-redux";
import {getPostOwnerInfo} from "../../../../Redux/reducers/authSlice";
import LoadingComponent from "../../LoadingComponent";

const PostUserInfo = ({userId}) => {
    const {loading, postOwner} = useSelector(state => state.auth)
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = projectFireStore.collection('Users').onSnapshot(() => {
            dispatch(getPostOwnerInfo({userId}))
        })
        return () => unsubscribe()
    }, [dispatch, userId]);

    if (loading) return <LoadingComponent/>

    return (
        <div>

        </div>
    );
};

export default PostUserInfo;
