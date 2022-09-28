import React, {ReactElement, useCallback} from "react";

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
            {isOpen &&
                <div>
                    <div onClick={backGroundClick}></div>
                    <div style={{border: '1px solid black'}}>
                        {children}
                    </div>
                </div>
            }
        </>
    )
})