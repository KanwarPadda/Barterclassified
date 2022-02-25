import "./styles.css";
import React from "react";
import NavBar from "./components/layout/pages/Navbar/NavBar";
import AdminDashBoard from "./components/admin/AdminDashBoard";
import {Route, Switch} from "react-router-dom";
import HomePage from "./components/layout/pages/Home/HomePage";
import ModalManager from "./components/layout/modals/ModalManager";
import {ToastContainer} from "react-toastify";
import Category from "./components/layout/categories/Category";
import {useSelector} from "react-redux";
import ErrorComponent from "./components/layout/ErrorComponent";
import FeaturedCategory from "./components/layout/pages/FeaturedCategory/FeaturedCategory";
import {Container} from "semantic-ui-react";
import SandBox from "./components/test/SandBox";
import ProfilePage from "./components/layout/profile/ProfilePage";
import BarterForm from "./components/layout/barter/BarterForm";
import Posts from "./components/layout/posts/Posts";
import PostDetails from "./components/layout/posts/postDetails/PostDetails";

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
                            <Route path={'/sandbox'}>
                                <SandBox/>
                            </Route>
                            <Route exact path={"/admin"}>
                                {!admin && <ErrorComponent message={"you are not authorized"}/>}
                                {admin && <AdminDashBoard/>}
                            </Route>
                            <Route exact path={"/category/:id"}>
                                <Category/>
                            </Route>
                            <Route exact path={"/profile"}>
                                {!currentUser && <ErrorComponent message={"you are not authorized"}/>}
                                {currentUser && <ProfilePage/>}
                            </Route>
                            <Route path={'/featured'}>
                                <FeaturedCategory/>
                            </Route>
                            <Route exact path={'/create'}>
                                <BarterForm/>
                            </Route>

                            <Route exact path={'/posts/:id'}>
                                <Posts/>
                            </Route>
                            <Route exact path={'/details/:id'}>
                                <PostDetails/>
                            </Route>
                        </Container>
                    </>
                </Switch>
            </>
        </>
    );
};

export default App;
