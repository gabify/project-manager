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
    const [time, setTime] = useState(5)
    const [hasStarted, setHasStarted] = useState(false)
    const [currentPomodoro, setCurrentPomodoro] = useState(0)
    const {get, fetchLoading, fetchError} = useFetch()
    const [accomplishment, setAccomplishment] = useState('')
    const [accomplishments, setAccomplishments] = useState([])

    const pomodoroCycle = [25*60, 5*60, 25*60, 5*60, 25*60, 5*60, 25*60, 30*60]
    const [phaseIndex, setPhaseIndex] = useState(0)

    const handleClose = () =>{
        setOpen(false)

        if(currentPomodoro > 0){
            const nextIndex = phaseIndex + 1

            if(nextIndex === pomodoroCycle.length){
                if(currentPomodoro === 1){
                    setHasStarted(false)
                    return
                }

                setPhaseIndex(0)
                setCurrentPomodoro((prev) => Math.max(prev - 1, 0))
                setTime(pomodoroCycle[0])
            }else{
                setPhaseIndex(nextIndex)
                setTime(pomodoroCycle[nextIndex])
            }

            console.log(nextIndex)
            setHasStarted(true)
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        setAccomplishments([accomplishment, ...accomplishments])
        setAccomplishment('')
        handleClose()
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
                        <Timer 
                            hasStarted={hasStarted}
                            startTimer={() => setHasStarted(true)}
                            stopTimer={() => setHasStarted(false)}
                            time={time}
                            setTime={setTime}
                        />
                        <div className="text-center">
                            <h2 className="text-lg font-medium">{task.taskName}</h2>
                            <p className="text-sm font-light">{task.description}</p>
                        </div> 
                    </div>
                )}
                <div className="mx-2 my-3">
                    <h4 className="mb-2 font-medium tracking-wide">
                        Your accomplishments
                    </h4>
                    <ol
                        className="list-[number] font-light text-sm ms-3"
                    >
                        {accomplishments && accomplishments.map((acc) =>(
                            <li key={acc}>
                                {acc}
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className="text-center">
                    {phaseIndex % 2 === 0 ? (
                        <div>
                            <h3 className="font-medium">Times up!</h3>
                            <p className="text-sm font-light mb-3">Relax! Time to rest for a while!</p>

                            <form onSubmit={handleSubmit}>
                                <div className="px-2 py-3 mb-1 flex flex-col">
                                    <label htmlFor="accomplishment" className='text-xs font-medium tracking-wide mb-1.5 text-left'>Set Accomplishment</label>
                                    <textarea 
                                        type="text" 
                                        className='border-2 border-gray-500 rounded-sm py-1 px-2 text-sm font-light outline-none' 
                                        value={accomplishment}
                                        onChange={(e) => setAccomplishment(e.target.value)}
                                    ></textarea>
                                </div>

                                <button 
                                    className="text-xs"
                                >
                                    Ok
                                </button>
                            </form>
                        </div>
                    ) : (

                        <div>
                            <h3 className="font-medium">Times up!</h3>
                            <p className="text-sm font-light mb-3">Break time is over, time to work again!</p>


                            <button 
                                onClick={handleClose}
                                className="text-xs"
                            >
                                Ok
                            </button>
                        </div>
                    )}
                </div>
            </Modal>
        </>
     );
}
 
export default Pomodoro;