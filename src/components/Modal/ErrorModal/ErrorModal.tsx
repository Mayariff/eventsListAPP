import React from 'react';
import {modalContentType, modalType} from "../types";
import {Modal} from "../Modal";
import {useAppDispatch} from '../../../utils/redux-utils';
import {commonActions} from '../../../features/common_actions/app-actions';
import s from './ErrorModal.module.scss'
import Button from '../../Button/Button';


const Error = React.memo(({showAdd, payload}: modalContentType<{ error: string | null }>) => {

    const dispatch = useAppDispatch()
    const closeModal = () => {
        dispatch(commonActions.setAppError({error: null}))
        showAdd(false)
    }

    return (
        <div className={s.container}>
            <div className={s.title}>{payload.error}</div>
            <Button btnName={'OK'} onClick={closeModal} color={'second'}/>
        </div>
    );
});

const ErrorModal = ({isOpen, changeIsOpen, payload}: modalType<{ error: string | null }>) => <Modal isOpen={isOpen}
                                                                                                    changeModal={changeIsOpen}>
    <Error showAdd={changeIsOpen} payload={{error: payload.error}}/>
</Modal>


export default ErrorModal;