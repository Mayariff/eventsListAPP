import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {data} from "./data/fakeData";
import {store} from "./App/store";
import {ArrangementList} from "./API/ArrangementList";
import {Provider} from "react-redux";
import Routing from "./Routing/Routing";
import {BrowserRouter} from "react-router-dom";
import {DataContex, selectData} from './data/context_data';

ArrangementList.setStartDate(data)


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <DataContex.Provider value={selectData}>
            <Routing/>
                </DataContex.Provider>
            </BrowserRouter>
            {/*<RouterProvider router={router}/>*/}
        </Provider>
    </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
