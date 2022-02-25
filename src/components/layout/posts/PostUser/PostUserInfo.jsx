import React, {useEffect, useState} from 'react';
import {projectFireStore} from "../../../../firestore/config";
import {useDispatch, useSelector} from "react-redux";
import {getPostOwnerInfo} from "../../../../Redux/reducers/authSlice";
import LoadingComponent from "../../LoadingComponent";
import ProfileMap from "../../profile/ProfileMap";
import {Button} from "semantic-ui-react";

const PostUserInfo = ({userId}) => {
    const {loading, postOwner} = useSelector(state => state.auth)
    const [showMap, setShowMap] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = projectFireStore.collection('Users').onSnapshot(() => {
            dispatch(getPostOwnerInfo({userId}))
        })
        return () => unsubscribe()
    }, [dispatch, userId]);

    if (loading) return <LoadingComponent/>


    return (
        <>
            <Button content={"show Sellers Location"} color={'green'} onClick={() => setShowMap(!showMap)}/>
            {showMap && <ProfileMap latLng={postOwner.location?.latLng}/>}

        </>
    );
};

export default PostUserInfo;
