import React, { Component, useState } from "react";
import "./HomePage.scss";
import Header from "../header/Header";
import Banner from "../section/HeroBanner";

class HomePage extends Component {
    render() {
        return (
            <>
                <Header />
                <Banner />
            </>
        );
    }
}
export default HomePage;
