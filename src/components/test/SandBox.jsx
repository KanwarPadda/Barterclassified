import React from 'react';
import {Button} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {getProducts} from "../../Redux/reducers/productSlice";

const SandBox = () => {
    const args = {id: 'XTehu4n83Y7ywqMdzOD7'};
    const dispatch = useDispatch();
    return (
        <>
            <Button content={'test'} onClick={()=>dispatch(getProducts({args}))}/>
        </>
    );
};

export default SandBox;
