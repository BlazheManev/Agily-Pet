import React from 'react';
import { ChangeEvent } from 'react';
import { FormEvent } from 'react';
import { Course } from './razredi/Course';
import { Link } from 'react-router-dom';
import './css/oblikovanje.css';

interface MyProps {
    rowNum: number;
    handleAddObstacle: (x: number, y: number, e : React.MouseEvent<HTMLTableCellElement, MouseEvent>) => void;
}

let MyRow = (props: MyProps) => {

    return (<tr>
        <td className='port_td'  onClick={(e) => props.handleAddObstacle(props.rowNum, 0, e)} ></td>
        <td className='port_td'  onClick={(e) => props.handleAddObstacle(props.rowNum, 1, e)}></td>
        <td className='port_td'  onClick={(e) => props.handleAddObstacle(props.rowNum, 2, e)}></td>
        <td className='port_td'  onClick={(e) => props.handleAddObstacle(props.rowNum, 3, e)}></td>
        <td className='port_td'  onClick={(e) => props.handleAddObstacle(props.rowNum, 4, e)}></td>
        <td className='port_td'  onClick={(e) => props.handleAddObstacle(props.rowNum, 5, e)}></td>
    </tr>);
}

export default MyRow;
