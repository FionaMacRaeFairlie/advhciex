import React from "react";
import { render } from "react-dom";
import LandingPage from "../components/LandingPage/LandingPage";
import { Switch, Route } from "react-router-dom";
import Register from "../components/RegisterLogin/Register";
import Login from "../components/RegisterLogin/login";
import Home from "../components/Homepage/Home";
import Map from "../components/Map/Map";
import HomepageModal from "../components/Homepage/HomepageModal";
const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <LandingPage></LandingPage>
      </Route>
      <Route path="/register">
        <Register></Register>
      </Route>
      <Route path="/login">
        <Login></Login>
      </Route>
      <Route path="/homepage">
        <Home></Home>
      </Route>
    </Switch>
  );
};

export default AppRoutes;
