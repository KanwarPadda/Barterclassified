import React from "react";
import {Button, Container, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {openModal} from "../../Redux/reducers/modalSlice";
import {logOutUserAsync} from "../../Redux/reducers/authSlice";


const NavBar = () => {
    const {currentUser, admin} = useSelector(state => state.auth);

    const dispatch = useDispatch();
    return (
        <Menu inverted fixed={"top"}>
            <Container>
                <Menu.Item header as={Link} to={"/"}>
                    The Barter Classified
                </Menu.Item>
                <Menu.Item position={"right"}>
                    {(!currentUser && !admin) && (
                        <>
                            <Button
                                onClick={() => dispatch(openModal({modalType: "LogInForm"}))}
                                basic
                                inverted
                                content={"login"}
                            />
                            <Button
                                basic
                                inverted
                                content={"Register"}
                                style={{marginLeft: "0.5em"}}
                                onClick={() => dispatch(openModal({modalType: "RegisterForm"}))}
                            />
                        </>)
                    }

                    {(currentUser || admin) &&  <Button
                        basic
                        inverted
                        content={'Logout'}
                        onClick={() => dispatch(logOutUserAsync())}
                    /> }


                </Menu.Item>
            </Container>
        </Menu>
    );
};

export default NavBar;
