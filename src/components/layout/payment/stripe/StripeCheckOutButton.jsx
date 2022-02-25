import React from 'react';
import StripeCheckout from "react-stripe-checkout";
import {toast} from "react-toastify";

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51Ja1BuJt1snT2vEaqMyyvVgYBitmvGk7s7E3Yp68kdVWJvLhd5pKNBgKdDcaVbAm8xVTMk0JT7zAxlBWf4aLqXOv00Vw2r8qjO'

    const onToken = token => {
        console.log(token)
        toast.success('payment sucessful.')
    }

    return (
        <StripeCheckout stripeKey={publishableKey}
                        label={'Pay Now'}
                        billingAddress

                        amout={priceForStripe}
                        image={'https://svgshare.com/i/Y0o.svg'}
                        description={`your total is $${price}`}
                        panelLabel={'pay now'}
                        token={onToken}>

        </StripeCheckout>
    );
};

export default StripeCheckoutButton
