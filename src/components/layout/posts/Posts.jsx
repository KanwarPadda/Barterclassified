import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import LoadingComponent from "../LoadingComponent";
import {projectFireStore} from "../../../firestore/config";
import {getProducts} from "../../../Redux/reducers/productSlice";
import PostCollection from "./collection/PostCollection";
import {Grid, Header} from "semantic-ui-react";

const Posts = () => {

    let {id,postitle} = useParams();
    const {loading, products} = useSelector(state => state.product);

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
        <div>

            <Header as={'h1'} content={postitle.toUpperCase()} textAlign={'center'}/>

            <br/>
            <Grid>

                <Grid.Row>


                    {products.map(product => <PostCollection key={product.id} post={product}/>)}

                </Grid.Row>

            </Grid>

        </div>
    );
};

export default Posts;
