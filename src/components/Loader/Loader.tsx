import React from 'react';
import s from './Loader.module.scss'

const Loader = () => {
    return (
        <div>
            <div className={s.ring}>Loading
                <span></span>
            </div>
        </div>
    );
};

export default Loader;