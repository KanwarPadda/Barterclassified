import "./styles.css";
import React from "react";
import NavBar from "./components/layout/NavBar";
import { Container } from "semantic-ui-react";
import AdminDashBoard from "./components/admin/AdminDashBoard";
import { Route, Routes, Switch } from "react-router-dom";
import HomePage from "./components/layout/pages/HomePage";
import ModalManager from "./components/layout/modals/ModalManager";
import { ToastContainer } from "react-toastify";
import Category from "./components/layout/categories/Category";
import {useSelector} from "react-redux";

const App = () => {




    return (


        <>
            <ModalManager/>
            <ToastContainer/>
            <NavBar/>
            <Container className="main">
                <Switch>
                    <Route exact path={"/"}>
                        <HomePage/>
                    </Route>

                    <Route exact path={"/admin"}>
                        <AdminDashBoard/>
                    </Route>
                    <Route exact path={"/category/:id"}>
                        <Category/>
                    </Route>
                </Switch>
            </Container>
        </>
    );
};

export default App;
