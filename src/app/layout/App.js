import "./styles.css";
import React from "react";
import NavBar from "../../features/navbar/NavBar";
import { Container } from "semantic-ui-react";
import AdminDashBoard from "../../features/admin/AdminDashBoard";
import { Route, Routes, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ModalManager from "../common/modals/ModalManager";
import { ToastContainer } from "react-toastify";
import Category from "../common/cateogry/Category";

function App() {
  return (
    <>
      <ModalManager />
      <ToastContainer />
      <NavBar />
      <Container className="main">
        <Switch>
          <Route exact path={"/"}>
            <HomePage />
          </Route>
          <Route exact path={"/admin"}>
            <AdminDashBoard />
          </Route>
          <Route exact path={"/category/:id"}>
            <Category />
          </Route>
        </Switch>
      </Container>
    </>
  );
}

export default App;
