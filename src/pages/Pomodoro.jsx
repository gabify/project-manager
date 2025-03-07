import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import Timer from "../components/Timer";
import Modal from "../components/Modal"

const Pomodoro = () => {
    const location = useLocation()
    const [task, setTask] = useState(null)
    const [open, setOpen] = useState(false)
    const [time, setTime] = useState(1500)
    const [hasStarted, setHasStarted] = useState(false)
    const [isBreak, setIsBreak] = useState(false)
    const [currentPomodoro, setCurrentPomodoro] = useState(0)
    const {get, fetchLoading, fetchError} = useFetch()

    const handleClose = () =>{
        if(currentPomodoro > 0){
            if(!isBreak){
                setTime(300)
                setIsBreak(true)
            }else{
                setTime(1500)
                setIsBreak(false)
                setCurrentPomodoro((prev) => Math.max(prev - 1, 0))
            }
            setHasStarted(true)
        }
        setOpen(false)
    }

    const getTask = async() =>{
        const task = await get(`/task/id/${location.state.id}`)
        setTask(task)
        setCurrentPomodoro(task.pomodoroCount)
    }

    useEffect(() =>{
        getTask()
    }, [])

    useEffect(() =>{
        if(time === 0){
            setOpen(true)
            setHasStarted(false)
        }
    }, [time])

    return ( 
        <>
            <Header />
            <section>
                {task && (
                    <div>
                        <h2>{task.taskName}</h2>
                        <p>{task.description}</p>
                        {currentPomodoro}
                        <Timer 
                            hasStarted={hasStarted}
                            startTimer={() => setHasStarted(true)}
                            stopTimer={() => setHasStarted(false)}
                            time={time}
                            setTime={setTime}
                        /> 
                    </div>
                )}
            </section>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <h3>Times up!</h3>
                <p>Time to rest for a while</p>
                <button onClick={handleClose}>
                    Ok
                </button>
            </Modal>
        </>
     );
}
 
export default Pomodoro;