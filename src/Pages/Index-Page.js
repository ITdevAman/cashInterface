import React from 'react';
import Navbar from "../Component/Layout/Navbar";
import Home from "./Home";
import Cash from "./Cash";

const IndexPage = () => {
    return (
        <section id={"cash"}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-1">
                        <Navbar/>
                    </div>
                    <div className="col-lg-8">
                        <Home/>
                    </div>
                    <div className="col-lg-3">
                        <Cash/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IndexPage;