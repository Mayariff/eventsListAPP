import React from 'react';
import s from './TableHeader.module.scss'


const TableHeader = () => {
    return (
        <thead className={s.tableHeader}>
        <tr>
            <th colSpan={2} className={s.firstHeader}>Даты проведения</th>
            <th rowSpan={2} className={s.firstHeader}>Название</th>
            <th rowSpan={2} className={s.firstHeader}>Тип</th>
        </tr>
        <tr>
            <th className={s.secondHeader}>Начало</th>
            <th className={s.secondHeader}>Конец</th>
        </tr>
        </thead>
    );
};

export default TableHeader;