import React from 'react';
import EventList from "../features/EventList/EventList";
import Event from "../features/Event/Event";
import {Route, Routes} from "react-router-dom";
import {ErrorPage} from "../components/ErrorPage/ErrorPage";
import App from "../App/App";


const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<App/>}>
                <Route path={"/"} element={<EventList/>}/>
                <Route path={"/:id"} element={<Event/>}/>
                <Route path="*" element={<ErrorPage/>}/>
            </Route>
        </Routes>
    );
};

export default Routing;