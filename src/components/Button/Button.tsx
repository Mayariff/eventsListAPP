import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import s from './Button.module.scss'
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type SuperButtonPropsType = DefaultButtonPropsType & {
    btnName?: string
    color?: 'second',

}

const Button:React.FC<SuperButtonPropsType> = ({className,btnName,color,...props}) => {

    const finalClassName =  props.disabled ? `${s.default} ${s.disabled}` : (color==='second'? `${s.default} ${s.active} ${s.red}` : `${s.default} ${s.active}`)


    return (
        <button
           className={finalClassName}
            {...props}
        >{btnName}</button>
    );
};

export default Button;