import {valueSelectType} from '../../data/context_data';
import {eventType, statusEventType} from '../../API/types';
import {DetailedHTMLProps, InputHTMLAttributes} from 'react';


export type fieldType<T> = {
    values?: Array<valueSelectType>
    onChangeHandler: (value: string) => void
    labelName: string
    labelFor: string
    value: T
    type?: 'text' | 'date'
    errorHandler?: (error: string | null) => void
}


export type selectDataType = statusEventType | eventType | 'all'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type textFieldType = fieldType<string> & DefaultInputPropsType & {
    maxLength?: number,
    onEnter?: () => void
}