import React from 'react';
import {Button, Container, Menu} from "semantic-ui-react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {openModal} from "../../app/store/modalSlice";

const NavBar = () => {

    const dispatch = useDispatch();
    return (
        <Menu inverted fixed={'top'}>
            <Container>
                <Menu.Item header as={Link} to={'/'}>

                    The Barter Classified
                </Menu.Item>
                <Menu.Item position={'right'}>
                    <Button  onClick={() => dispatch(openModal({modalType: 'LogInForm'}))} basic inverted
                            content={'login'}/>
                    <Button basic inverted content={'Register'} style={{marginLeft: '0.5em'}}/>
                </Menu.Item>

            </Container>
        </Menu>
    );
};

export default NavBar;
