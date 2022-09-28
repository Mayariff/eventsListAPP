export type modalType<T>={
    isOpen: boolean,
    changeIsOpen: (isOpen: boolean) => void
    payload: T
}

export type modalContentType<D> ={
    showAdd: (isOpen: boolean) => void
    payload: D
}
