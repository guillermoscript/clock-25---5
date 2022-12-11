import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import TimeButtons from './components/TimeButtons';
import { useEffect } from 'react';
import Timer from './components/Timer';
import { useRef } from 'react';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [time, setTime] = useState(25 * 60);
  const [start, setStart] = useState(false);
  const [clockRunning, setClockRunning] = useState({
    break: false,
    session: false,
  });
  const [timeText, setTimeText] = useState('Session');
  const [startText, setStartText] = useState('Start');
  const audio = useRef(null);

  const onClickTimeButtons = (e) => {
    const id = e.target.id;
    const options = {
      "break-decrement": () => {
        if (breakLength > 1) {
          setBreakLength(prev => prev - 1);
          setTime((breakLength * 60) - 60);
        }
      },
      "break-increment": () => {
        if (breakLength < 60) {
          setBreakLength(prev => prev + 1);
          setTime((breakLength * 60) + 60);
        }
      },
      "session-decrement": () => {
        if (sessionLength > 1) {
          setSessionLength(prev => prev - 1);
          setTime((sessionLength * 60) - 60);
        }
      },
      "session-increment": () => {
        if (sessionLength < 60) {
          setSessionLength(prev => prev + 1);
          setTime((sessionLength * 60) + 60);
        }
      },
    }
    options[id]();
  }

  const checkIsRunning = () => {
    if (clockRunning.break) {
      return 'break';
    }
    if (clockRunning.session) {
      return 'session';
    }
    return 'session';
  }

  const onClickStartStop = () => {
    setStart(prev => !prev);
    if (checkIsRunning() === 'break') {
      setClockRunning(prev => {
        return {
          ...prev,
          break: !prev.break,
        }
      })
    }
    if (checkIsRunning() === 'session') {
      setClockRunning(prev => {
        return {
          ...prev,
          session: !prev.session,
        }
      })
    }
  }

  const onReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTime(25 * 60);
    setStart(false);
    setClockRunning({
      break: false,
      session: false,
    });
    setTimeText('Session')
    setStartText('Start')
    audio.current.pause()
    audio.current.currentTime = 0;
  }

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        if (checkIsRunning() === 'break') {

          if (time === 0) {
            setClockRunning(prev => {
              return {
                ...prev,
                break: false,
                session: false,
              }
            })
            setTimeText('Session');
            audio.current.play();
            setTime((sessionLength * 60) + 1)
          }
          setTime(minutesInSeconds => {
            return minutesInSeconds - 1;
          });
        }
        if (checkIsRunning() === 'session') {

          if (time === 0) {

            setClockRunning(prev => {
              return {
                ...prev,
                break: true,
                session: false,
              }
            })
            setTimeText('Break');
            audio.current.play();
            setTime((breakLength * 60) + 1);
          }
          setTime(minutesInSeconds => {
            return minutesInSeconds - 1;
          });
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [start, time])

  let completeTime = new Date((time * 1000) + 1).toISOString().slice(14, 19);
  if (time === 3600)
    completeTime = '60:00';

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React 25 + 5 Clock</h1>
      <div className='wrp'>
        <TimeButtons
          lengthId="break"
          lengthText="Break Length"
          numberLenght={breakLength}
          disabled={start}
          onClick={onClickTimeButtons}
        />
        <TimeButtons
          lengthId="session"
          lengthText="Session Length"
          numberLenght={sessionLength}
          disabled={start}
          onClick={onClickTimeButtons}
        />

      </div>
      <Timer
        onClickStartStop={onClickStartStop}
        onReset={onReset}
        timeText={timeText}
        start={startText}
        setStart={setStartText}
        time={completeTime}
      />
      <audio ref={audio} id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  )
}

export default App
