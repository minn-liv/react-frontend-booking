import React, { Component } from "react";
import "./CategoryShop.scss";
import Header from "../header/Header";
import FooterMini from "../../booking/footer/FooterMini";
import FilterSection from "./FilterSection";
class CategoryShop extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <FilterSection />
                <FooterMini />
            </React.Fragment>
        );
    }
}
export default CategoryShop;
