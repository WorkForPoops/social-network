import React from 'react';
import s from './../Dialogs.module.css';

type PropsType = {
    message: string
    key: number
}

const Message: React.FC<PropsType> = (props) => {
    let a = 1
    // const thisMessage = () => {
    //     props.message.((id: number) => {

    //     })
    // }

    return (
        <div>
            {props.key == a ? props.message : <div>hello</div>}
        </div>
    )
    // <div className={s.dialog}>{props.message}</div>
}

export default Message;
