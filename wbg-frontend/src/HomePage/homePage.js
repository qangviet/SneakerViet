import Header from "./Header/header";
import Slider from "./Slider/slider";
import React from "react";
import FeatureProduct from "./Product/featureProduct";
function HomePage() {
    return (
        <div className="content-wrapper max-w-screen-2xl text-base mx-auto">
            <Header />
            <Slider />
            <FeatureProduct />
        </div>
    );
}
export default HomePage;
