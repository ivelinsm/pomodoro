import React from 'react'

function Display(props) {

    return(
    <div className='container__display'>
        <div id="timer-label">
            {props.title}
        </div>
        <span id="time-left">
            {props.time}
        </span>
        <div id="adjust-pomodoro">
            <button id="start_stop" onClick={props.startTimer}>Start</button>
            <button onClick={props.stopTimer}>Stop</button>
            <button id="reset" onClick={props.restartTimer}>Restart</button>
        </div>
    </div>
    )
}

export default Display