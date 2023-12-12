import React, { Component, useState } from "react";
import "./HomePage.scss";
import Header from "../header/Header";
import HeroBanner from "../section/HeroBanner";
import ServiceExperience from "../section/ServiceExperience";
import Footer from "../footer/Footer";
import FooterMini from "../footer/FooterMini";
import ServiceArea from "../section/ServiceArea";
import Trending from "../../shop/trending/Trending";

class HomePage extends Component {
    render() {
        return (
            <>
                <Header />
                <HeroBanner />
                <ServiceExperience />
                {/* <Footer /> */}
                <ServiceArea />
                <Trending />

                <FooterMini />
            </>
        );
    }
}
export default HomePage;
