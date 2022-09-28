import React from 'react';


const TableHeader = () => {
    return (
        <thead>
        <tr>
            <th colSpan={2}>Даты проведения</th>
            <th rowSpan={2}>Название</th>
            <th rowSpan={2}>Тип</th>
        </tr>
        <tr>
            <th>Начало</th>
            <th>Конец</th>
        </tr>
        </thead>
    );
};

export default TableHeader;