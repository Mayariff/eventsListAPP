import React from 'react';
import {modalContentType, modalType} from "../types";
import {Modal} from "../Modal";
import {useAppDispatch} from "../../../utils/redux-utils";
import {commonActions} from "../../../features/common_actions/app-actions";


const Error = React.memo(({showAdd, payload}: modalContentType<{ error: string | null }>) => {
    const dispatch = useAppDispatch()
    const closeModal = () => {
        dispatch(commonActions.setAppError({error: null}))
        showAdd(false)
    }

    return (
        <div style={{border: '1px solid black'}}>
            {payload.error}
            <button onClick={closeModal}> OK</button>
        </div>
    );
});

const ErrorModal = ({isOpen, changeIsOpen, payload}: modalType<{ error: string | null }>) => <Modal isOpen={isOpen}
                                                                                                    changeModal={changeIsOpen}>
    <Error showAdd={changeIsOpen} payload={{error: payload.error}}/>
</Modal>


export default ErrorModal;