import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useRef, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import Timer from "../components/Timer";
import Modal from "../components/Modal"
import { usePost } from "../hooks/usePost";

const Pomodoro = () => {
    const {send, postLoading, postError} = usePost()
    const navigate = useNavigate()

    //fetching task data
    const location = useLocation()
    const [task, setTask] = useState(null)
    const {get, fetchLoading, fetchError} = useFetch()

    //modal states
    const [open, setOpen] = useState(false)
    const [openModalFinished, setOpenModalFinished] = useState(false)

    //timer states
    const [time, setTime] = useState(5) //default is 25 * 60 (25 minutes)
    const [hasStarted, setHasStarted] = useState(false)

    //accomplishment states
    const [accomplishment, setAccomplishment] = useState('')
    const [accomplishments, setAccomplishments] = useState([])

    //pomodoro count and cycle states
    //default cycle
    //const pomodoroCycle = [25*60, 5*60, 25*60, 5*60, 25*60, 5*60, 25*60, 30*60]

    //test cycle
    const pomodoroCycle = [5, 3, 5, 3, 5, 10]
    const [phaseIndex, setPhaseIndex] = useState(0)
    const [currentPomodoro, setCurrentPomodoro] = useState(0)
    const [workingSessions, setWorkingSessions] = useState(0)
    const pomodoroCycleLengthRef = useRef(pomodoroCycle.length)

    //update task status
    const handleComplete = async() =>{
        const updatedTask = {
            taskId: location.state.id,
            currentStatus: 'Done'
        }

        const response = await send(updatedTask, '/task/update')
        if(!response.success){
            throw Error('Some error occured')
        }else{
            navigate('/')
        }
    }


    //closes in between session modals
    const handleClose = () =>{
        setOpen(false)

        if(currentPomodoro > 0){
            let numOfWorkSession = phaseIndex % 2 === 0 ? workingSessions + 1 : workingSessions
            setWorkingSessions(numOfWorkSession)

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

            setHasStarted(true)
        }
    }

    //adds accomplishements 
    const handleSubmit = (e) =>{
        e.preventDefault()

        setAccomplishments([accomplishment, ...accomplishments])
        setAccomplishment('')
        handleClose()
    }

    //retrieving task from db function
    const getTask = async() =>{
        const task = await get(`/task/id/${location.state.id}`)
        setTask(task)
        setCurrentPomodoro(task.pomodoroCount)
    }

    //retrieving task effect
    useEffect(() =>{
        getTask()
    }, [])

    //in between modal effect
    useEffect(() =>{
        if(time === 0){
            if(currentPomodoro === 1 && phaseIndex === pomodoroCycleLengthRef.current -1){
                setHasStarted(false)
                setOpenModalFinished(true)
            }else{
                setOpen(true)
                setHasStarted(false)
            }
        }

        console.log(currentPomodoro)
    }, [time, currentPomodoro, phaseIndex])


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

            <Modal
                open={openModalFinished}
                onClose={() => setOpenModalFinished(false)}
            >
                <div className="text-center">
                    <h3 className="text-xl font-semibold">Great Job!</h3>
                    <p className="tracking-wide font-medium mb-3">
                        You finished {workingSessions} work sessions and completed {workingSessions * 25} minutes of focused work!
                    </p>
                    <p className="font-light tracking-wide mb-2">Do you want to mark this task as completed?</p>

                    <div className="flex justify-evenly gap-2">
                        <button onClick={handleComplete}>
                            Yes, Its done
                        </button>

                        <button>
                            No, still in progress
                        </button>
                    </div>
                </div>
            </Modal>
        </>
     );
}
 
export default Pomodoro;