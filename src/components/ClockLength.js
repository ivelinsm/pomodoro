import React from 'react'
import { PlusCircle } from '../icons/PlusCircle';
import { MinusCircle } from '../icons/MinusCircle';

function ClockLength(props) {
    return(
        <div className="container__settings_timeLength">
            <h2 id={`${props.id}-label`}>{props.title}</h2>
            <div className='settings_buttons'>
            <button id={`${props.id}-decrement`} onClick={() => props.duration(-60)}><MinusCircle /></button>
                <h3 id={`${props.id}-length`}>{props.time}</h3>
                <button id={`${props.id}-increment`} onClick={() => props.duration(60)}><PlusCircle /></button>
            </div>
        </div>
    )
}

export default ClockLength;