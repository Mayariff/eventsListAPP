import React, {ReactElement, useCallback} from 'react';
import s from './Modal.module.scss'

export type ReturnComponentType = Nullable<ReactElement>;
export type Nullable<T> = T | null;
export type ModalType = {
    children: React.ReactElement
    isOpen: boolean
    changeModal: (isOpen: boolean) => void
}

export const Modal: React.FC<ModalType> = React.memo(({
                                                          children,
                                                          isOpen,
                                                          changeModal,
                                                          ...props
                                                      }): ReturnComponentType => {

    const backGroundClick = useCallback(() => {
        changeModal(false)
    }, [changeModal])

    return (<>
        {isOpen && <div className={s.main}>
            <div className={s.body}>
                {children}
            </div>
            <div className={s.wrapper} onClick={backGroundClick}></div>
        </div>}
    </>)
})