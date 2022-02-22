import React from 'react';
import {Button, Header, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

const ErrorComponent = ({message}) => {

    return (
        <Segment>
            <Header textAlign={'center'} content={message ? message : 'not found'}/>
            <Button fluid as={Link} to={'/'} negative  style={{marginTop: 20}}  content={'Return to Homepage'}/>
        </Segment>
    );
};

export default ErrorComponent;
