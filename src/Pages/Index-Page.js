import React from 'react';
import Navbar from "../Component/Layout/Navbar";
import Home from "./Home";
import Cash from "./Cash";
import {css} from "@emotion/css";
const IndexpageSection = css`
  position: relative;
  width: 95vw;
`
const IndexPage = () => {
    return (
        <section id={"cash"}>
            <div className={IndexpageSection}>
                <div className="row">
                    <div className="col-1">
                        <Navbar/>
                    </div>
                    <div className="col-8">
                        <Home/>
                    </div>
                    <div className="col-3">
                        <Cash/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IndexPage;