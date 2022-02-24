import React from "react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import './NavBarStyle.scss'
import {ReactComponent as Logo} from "../../../../assets/crown.svg";
import {openModal} from "../../../../Redux/reducers/modalSlice";
import {Button} from "semantic-ui-react";
import {logOutUserAsync} from "../../../../Redux/reducers/authSlice";

const NavBar = () => {
    const {currentUser, admin} = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <div className="header">
            <Link to='/' className='logo-container'>
                <Logo className={'logo'}/>
            </Link>
            <div className='options'>
                <Button
                    className={'option'}

                    color={'orange'}
                    inverted
                    content={"Barter".toUpperCase()}
                />

                <Button as={Link} to={'/sandbox'} content={'Sandbox'}/>
                {(!currentUser && !admin) &&
                <>
                    <Button
                        className={'option'}
                        onClick={() => dispatch(openModal({modalType: "LogInForm"}))}
                        color={'green'}
                        inverted
                        content={"login".toUpperCase()}
                    />
                    <Button
                        inverted
                        className={'option'}
                        color={'violet'}
                        content={"Register".toUpperCase()}
                        style={{marginLeft: "0.5em"}}
                        onClick={() => dispatch(openModal({modalType: "RegisterForm"}))}
                    />
                </>}
                {(currentUser || admin) && <Button
                    color={'red'}
                    inverted
                    content={'Logout'}
                    onClick={async () => {
                        dispatch(logOutUserAsync());
                        history.push("/");
                    }}
                />}
                {currentUser && <Button as={Link} to={'/profile'} color={'orange'} inverted className={'option'}
                                        content={'My Profile'}/>}
                {currentUser && <Button as={Link} to={'/create'} color={'teal'} inverted className={'option'}
                                        content={'Post a Barter'}/>}


            </div>


        </div>
    );
};

export default NavBar;
