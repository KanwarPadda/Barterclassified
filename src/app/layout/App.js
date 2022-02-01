import './styles.css';
import React from 'react';
import NavBar from "../../features/navbar/NavBar";
import {Container} from "semantic-ui-react";
import AdminDashBoard from "../../features/admin/AdminDashBoard";
import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage";
import ModalManager from "../common/modals/ModalManager";
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <>
            <ModalManager/>
            <ToastContainer/>
            <NavBar/>
            <Container className="main">
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/admin'} element={<AdminDashBoard/>}/>
                </Routes>
            </Container>


        </>
    );
}

export default App;
