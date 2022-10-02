import s from './ErrorPage.module.scss'
import {useNavigate} from 'react-router-dom';
import React from 'react';

export const ErrorPage = () => {
    const navigate = useNavigate()
    const onClickHandler = () => {
        navigate('/')
    }
    return (
        <div className={s.container}>
            <h1 className={s.title}>Oops!</h1>
            <p className={s.text}>Такой страницы не существует</p>
            <button className={s.buttonBack} onClick={onClickHandler}/>
        </div>
    );
}

export default ErrorPage