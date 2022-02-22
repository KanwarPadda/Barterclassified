import "./styles.css";
import React from "react";
import NavBar from "./components/layout/NavBar";
import AdminDashBoard from "./components/admin/AdminDashBoard";
import {Route, Switch} from "react-router-dom";
import HomePage from "./components/layout/pages/Home/HomePage";
import ModalManager from "./components/layout/modals/ModalManager";
import {ToastContainer} from "react-toastify";
import Category from "./components/layout/categories/Category";
import {useSelector} from "react-redux";
import ErrorComponent from "./components/layout/ErrorComponent";
import FeaturedPage from "./components/layout/pages/FeaturedPage";
import {Container} from "semantic-ui-react";

const App = () => {

    const {currentUser, admin} = useSelector(state => state.auth);


    return (


        <>
            <ModalManager/>
            <ToastContainer theme={"colored"} position={'bottom-right'} hideProgressBar/>

            <>
                <Switch>
                    <Route exact path={"/"}>
                        <HomePage/>
                    </Route>
                    <>
                        <NavBar/>
                        <Container className="main">
                        <Route exact path={"/admin"}>
                            {!admin && <ErrorComponent message={"you are not authorized"}/>}
                            {admin && <AdminDashBoard/>}
                        </Route>
                        <Route exact path={"/category/:id"}>
                            <Category/>
                        </Route>
                        <Route path={'/featured'}>
                            <FeaturedPage/>
                        </Route>
                        </Container>
                    </>
                </Switch>
            </>
        </>
    );
};

export default App;
