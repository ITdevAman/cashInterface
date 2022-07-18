import React from "react";
import {Route, Routes} from "react-router-dom";
import IndexPage from "./Pages/Index-Page";
import Login from "./Pages/Login/login";
import {useSelector} from "react-redux";


function App() {
    const isAuth = useSelector(store => store.isAuth)
    const tokenRefresh = useSelector(store => store.token)
    return (
        <div>
            {!tokenRefresh &&
                   <div>
                   {!isAuth && <Routes><Route path="/" element={<Login/>}/></Routes>}{isAuth && <Routes><Route path="/" element={<IndexPage/>}/></Routes>}
                   </div>}
            {tokenRefresh &&
                <Routes><Route path="/" element={<IndexPage/>}/></Routes>
            }
        </div>
    );
}
export default App;
