import React, { Component } from "react";
import "./HomePageShop.scss";
import Header from "../header/Header";
import HeroBanner from "../../shop/section/Banner";
import Trending from "../trending/Trending";
import MainShop from "../main-shop/MainShop";
import FooterMini from "../../booking/footer/FooterMini";
class HomePage extends Component {
    render() {
        return (
            <>
                <Header />
                <HeroBanner />
                <Trending />
                <MainShop />
                <FooterMini />
            </>
        );
    }
}
export default HomePage;
