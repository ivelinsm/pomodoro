import React from "react";
import { useState, useRef, useEffect } from "react";
import ClockLength from "./ClockLength";
import Display from "./Display";

function App() {
  const audio = new Audio('ding-sound.mp3');
    audio.volume = 0.3;

    const Ref = useRef(null);

    const [clock, setClock] = useState({
        time: 1500,
        paused: true,
        break: 300, 
        session: 1500,
        breakTime: false,
    });

    const getTimeRemaining = (e) => {
        const minutes = Math.floor(clock.time / 60) % 60;
        const seconds = Math.floor(clock.time % 60);

        let rendered = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

        return rendered;
    };

    const startTimer = () => {
        setClock((clock) => ({
            ...clock,
            paused: false,
        }));
    };

    const stopTimer = () => {
        setClock((clock) => ({
            ...clock,
            paused: true,
        }));
    };

    const restartTimer = () => {
        setClock((clock) => ({
            ...clock,
            time: clock.session,
        }));
    };

    const changeBreakDuration = (num) => {
        if (clock.break > 60 || num > 0) {
            setClock((clock) => ({
                ...clock,
                break: clock.break + num,
            }));
        }
        console.log("Break duration changed" + clock.break);
    };

    const changeSessionDuration = (num) => {
        if (clock.session > 60 || num > 0) {
        setClock((clock) => ({
            ...clock,
            session: clock.session + num,
            time: clock.time + num,
        }));
    }
        console.log("Session duration changed" + clock.session);
    };

    useEffect(() => {
        const timeCount = setInterval(() => {
            if (!clock.paused && clock.time > 0) {
                setClock((clock) => ({
                    ...clock,
                    time: clock.time - 1,
                }));
            }
            else if (clock.time == 0) {
                if (clock.breakTime) {
                    setClock((clock) => ({
                        ...clock,
                        breakTime: false,
                        time: clock.session
                    }));
                    audio.play();
                    document.title = 'Work. Work. Work.';
                } else {
                    setClock((clock) => ({
                        ...clock,
                        breakTime: true,
                        time: clock.break
                    }));
                    audio.play();
                    document.title = 'Take a break';
                }
            }
        }, 1000);
        //Clearing interval
        return () => clearInterval(timeCount);
    });

    return (
        <div className="container">
            <header className="container__header">
                <h1 id="container__header_title">Pomodoro</h1>
            </header>
            <div id="container__settings">
                <ClockLength
                    title="Break Length"
                    time={clock.break / 60}
                    id="break"
                    duration={changeBreakDuration}
                />
                <ClockLength
                    title="Session Length"
                    time={clock.session / 60}
                    id="session"
                    duration={changeSessionDuration}
                />
            </div>
            <Display
                time={getTimeRemaining(clock.time)}
                title={clock.breakTime == true ? "Break Time" : "Session"}
                startTimer={startTimer}
                stopTimer={stopTimer}
                restartTimer={restartTimer}
            />
            <audio src="./public/ding-sound.mp3"></audio>
            <span id="warning">*A sound will be played when the timer ends.</span>
        </div>
    );
}

export default App;
