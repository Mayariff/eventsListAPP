import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../utils/redux-utils';
import {Outlet} from 'react-router-dom';
import {appActions, appSelectors} from '../features/Application';
import Loader from '../components/Loader/Loader';
import s from './App.module.scss'


function App() {

    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(appSelectors.selectIsInitialized)
    const status = useAppSelector(appSelectors.selectStatus)

    useEffect(() => {
        //localStorage.clear()
        dispatch(appActions.initializeApp())
    }, [isInitialized])

    if (!isInitialized) return <Loader/>
    return (
        <div className={s.container}>
            <div className={s.contentContainer}>
                <h1 className={s.title}>Календарь событий</h1>
                <Outlet/>
                {status === 'loading' && <Loader/>}
            </div>
        </div>
    );
}

export default App;
