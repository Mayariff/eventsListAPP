import React, {MouseEventHandler, useContext, useState} from 'react';
import Select from "../../components/formFields/Select/Select";
import {selectDataType} from "../../components/formFields/type";
import {DataContex} from "../../data/context_data";
import {eventType} from "../../API/types";
import {paramType} from "../EventList/eventlist-reducer";
import TextField from "../../components/formFields/TextField/TextField";


type propsType = {
    onClickHandler: (value: paramType) => void
}

const SettingTable = React.memo(({onClickHandler}: propsType) => {

    const selectData = useContext(DataContex).selectEventType

    //params
    const [dateFrom, setDateFrom] = useState<string>('')
    const [dateTo, setDateTo] = useState<string>('')
    const [type, setType] = useState<eventType | 'all'>('all')

    const onChangeInputValueFrom = (value: string) => setDateFrom(value)
    const onChangeInputValueTo = (value: string) => setDateTo(value)
    const selectHandler = (value: string) => setType(value as eventType)

    const onSubmitHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        onClickHandler({dateFrom, dateTo, type})
    }

    const onResetHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        setDateFrom('')
        setDateTo('')
        setType('all')
        onClickHandler({dateFrom: '', dateTo: '', type: 'all'})
    }

    return (
        <form>
            <Select values={selectData}
                    onChangeHandler={selectHandler}
                    labelName={'Тип события'}
                    labelFor={'event_type'}
                    value={type as selectDataType}/>
            <TextField labelName={'Дата начала'}
                       labelFor={'from_date'}
                       value={dateFrom}
                       onChangeHandler={onChangeInputValueFrom} type={'date'}
            />
            <TextField labelName={'Дата окончания'}
                       labelFor={'to_date'}
                       value={dateTo}
                       onChangeHandler={onChangeInputValueTo} type={'date'}/>
            <button type={"submit"} onClick={onSubmitHandler}> Искать</button>
            <button type={"reset"} onClick={onResetHandler}> X</button>
        </form>
    );
});

export default SettingTable;