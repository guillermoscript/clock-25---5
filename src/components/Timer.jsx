export default function Timer({ onClickStartStop, onReset, timeText, time, start, setStart }) {

    return (
        <div>
            <p id="timer-label">{timeText}</p>
            <p id="time-left">{time}</p>
            <button className="btn" onClick={() => {
                onClickStartStop();
                setStart(prev => prev === 'Start' ? 'Stop' : 'Start');
            }} id="start_stop">{start}</button>
            <button className="btn" onClick={onReset} id="reset">Reset</button>
        </div>
    )
}