import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {projectFireStore} from "../../../../firestore/config";
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../../../../Redux/reducers/productSlice";
import LoadingComponent from "../../LoadingComponent";
import PostUserInfo from "../PostUser/PostUserInfo";
import {Button, Grid, Header, Icon, Image, Segment} from "semantic-ui-react";
import StripeCheckoutButton from "../../payment/stripe/StripeCheckOutButton";

const PostDetails = () => {
    const {loading, product} = useSelector(state => state.product);
    const {currentUser} = useSelector(state => state.auth)
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
        <Grid>
            <Grid.Column width={6}>
                <Image src={product.post_photo}/>
            </Grid.Column>

            <Grid.Column width={9}>
                <Grid.Row>
                    <Header content={`Price: $ ${product.price}`} as={'h2'}/>
                    Description
                </Grid.Row>
                <Grid.Row>
                    <Header content={product.description} as={'h3'}/>
                    {(product.deliveryOptions?.delivery && product.deliveryOptions?.pickup) && (
                        <>
                            Delivery: <Icon circular inverted color='teal' name='check'/>
                            PickUP: <Icon circular inverted color='teal' name='check'/>
                        </>)}

                    {(product.deliveryOptions?.delivery && !product.deliveryOptions?.pickup) && (
                        <>
                            Delivery: <Icon circular inverted color='teal' name='check'/>
                            PickUP: <Icon circular inverted color='red' name='close'/>
                        </>
                    )}
                    {(!product.deliveryOptions?.delivery && product.deliveryOptions?.pickup) && (
                        <>
                            Delivery: <Icon circular inverted color='teal' name='close'/>
                            PickUP: <Icon circular inverted color='red' name='check'/>
                        </>
                    )}
                    <Header content={`Condition: ${product.condition}`} as={'p'}/>
                    <Header content={`Created: ${product.createdAt}`} as={'p'}/>

                    {product.barterImage && (<Segment>

                        <>
                            <Image src={product.barterImage}/>
                            <header content={`Barter Price :  ${product.barterPrice}`}/>
                            <header content={`ProductName:  ${product.barterProduct}`}/>
                            <Button content={'Pay now'} color={'teal'}/>
                            {currentUser.id !== product.user_id && (
                                <StripeCheckoutButton price={product.barterPrice}/>)}
                        </>


                    </Segment>)}


                </Grid.Row>

                <PostUserInfo userId={product.user_id}/>

                {currentUser.id !== product.user_id && (<StripeCheckoutButton price={product.price}/>)}

            </Grid.Column>


        </Grid>
    );
};

export default PostDetails;
