import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../utils/redux-utils";
import {Outlet} from 'react-router-dom';
import {appActions, appSelectors} from "../features/Application";
import Loader from "../components/Loader/Loader";
import {ErrorModal} from "../components/Modal";


function App() {


    const dispatch = useAppDispatch()

    const isInitialized = useAppSelector(appSelectors.selectIsInitialized)
    const error = useAppSelector(appSelectors.selectError)

    const [errorModal, setErrorModal] = useState(true);

    useEffect(() => {
     //localStorage.clear()
       dispatch(appActions.initializeApp())
    }, [isInitialized])


    if (!isInitialized) return <Loader/>
    return (
        <div>
            <h1> Календарь событий</h1>
            <Outlet/>
            {error && <ErrorModal isOpen={errorModal} changeIsOpen={setErrorModal} payload={{error}}/>}
        </div>
    );
}

export default App;
