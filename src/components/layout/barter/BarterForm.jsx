import React, {useEffect, useState} from 'react';
import {Button, Header, Segment} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from 'yup';
import {Form, Formik} from 'formik';
import {projectFireStore} from "../../../firestore/config";
import {fetchCategoriesAsync} from "../../../Redux/reducers/categorySlice";
import LoadingComponent from "../LoadingComponent";
import TextInput from "../../forms/common/TextInput";
import SelectInput from "../../forms/common/SelectInput";
import ImageUpload from "../../forms/common/ImageUpload";
import {ImageInput} from "formik-file-and-image-input";
import Checkboxes from "../../forms/common/CheckBoxes";
import {addProduct} from "../../../Redux/reducers/productSlice";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";

const BarterForm = () => {
    const imageFormats = ["image/png", "image/svg", "image/jpeg"]
    const history = useHistory();
    const dispatch = useDispatch();
    const {categories, loading} = useSelector(state => state.category);
    const [barterOffer, setBarterOffer] = useState(false)
    const deliveryOptions = [
        {key: "delivery", value: "delivery"},
        {key: "pickup", value: "pickup"},
    ];
    const itemCondition = [
        //{key: c.id, text: c.title, value: c.id}
        {key: "excellent", value: 'excellent', text: 'excellent'},
        {key: "good", value: 'good', text: 'good'},
        {key: "poor", value: 'poor', text: 'poor'},
    ];

    useEffect(async () => {
        const unsubscribe = await projectFireStore.collection('categories').onSnapshot(() => {
            dispatch(fetchCategoriesAsync());

        })
        return () => unsubscribe();
    }, [dispatch]);

    const initialValues = {
        title: '',
        price: '',
        description: '',
        images: null,
        categories: '',
        barterProduct: '',
        barterImage: '',
        barterPrice: null,
        checkBoxChoice: '',
        condition:''

    }
    const validationSchema = Yup.object({
        title: Yup.string().required('You Must provide a title'),
        price: Yup.number().required('You must provide a price'),
        description: Yup.string().required('You must provide a description'),
        images: Yup.mixed().required(),
        categories: Yup.string().required('You must provide a category'),
        barterProduct: barterOffer ? Yup.string().required('You must provide a barter') : Yup.string(),
        barterImage: barterOffer ? Yup.mixed().required('You must provide a barter') : Yup.mixed(),
        barterPrice: barterOffer ? Yup.mixed().required('You must provide a barter') : Yup.mixed(),
        checkBoxChoice: Yup.array().required("Required"),
        condition: Yup.mixed().required('please select a condition')


    });


    if (loading) return <LoadingComponent content={'loading...'}/>


    return (
        <Segment clearing>
            <Formik initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values,{setSubmitting, setErrors}) => {

                      await  dispatch(addProduct({values}));
                        setSubmitting(false);
                        toast.success('Post successfully added');
                        history.push('/featured')


                    }}>

                {({isSubmitting, dirty, isValid}) => (
                    <Form className={'ui form'}>
                        <Header sub color={'teal'} content={'Create a barter '}/>
                        <TextInput name={'title'} placeholder={'title'}/>
                        <TextInput name={'description'} placeholder={'description'}/>
                        <TextInput name={'price'} placeholder={'enter price'} type="number"/>
                        <ImageInput name={'images'} Component={ImageUpload} validFormats={imageFormats}/>
                        <SelectInput placeholder={'select Product Condition'} name={'condition'} options={itemCondition} />
                        <Checkboxes label={'Select Delivery options '} name={'checkBoxChoice'} options={deliveryOptions} />
                        <SelectInput placeholder={'select something'} name={'categories'}

                                     options={categories?.map(c => (
                                             {key: c.id, text: c.title, value: c.id}
                                         )
                                     )}

                        />


                        <Button type="button" content={'add a barter offer'}
                                onClick={() => setBarterOffer(!barterOffer)}/>
                        {barterOffer && (
                            <>
                                <TextInput name={'barterProduct'} placeholder={'enter  barter Product Name'}/>
                                <TextInput name={'barterPrice'} placeholder={'enter price'} type="number"/>
                                <ImageInput name={'barterImage'} Component={ImageUpload} validFormats={imageFormats}/>
                            </>
                        )}


                        <Button
                            loading={isSubmitting} // this will load the screen
                            disabled={!isValid || !dirty || isSubmitting}
                            type="submit"
                            fluid
                            positive
                            content={"enter"}
                            size={"large"}
                        />
                    </Form>

                )}

            </Formik>

        </Segment>
    );
};

export default BarterForm;
