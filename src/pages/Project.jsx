import { useLocation } from "react-router-dom";
import Card from "../components/Card"
import Header from "../components/Header";
import Modal from "../components/Modal";
import {useProjectContext} from "../hooks/useProjectContext"
import {useFetch} from '../hooks/useFetch'
import { useEffect, useState } from "react";
import { usePost } from "../hooks/usePost";

const Project = () => {
    const {get, fetchLoading, fetchError} = useFetch()
    const {send, postLoading, postError} = usePost()
    const location = useLocation()
    const [tasks, setTasks] = useState(null)
    const [open, setOpen] = useState(false)
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [pomodoroCount, setPomodoroCount] = useState(0)

    useEffect(() =>{
        const getTasks = async() =>{
            const tasks = await get(`/task/${location.state.id}`)
            setTasks(tasks)
            console.log(tasks)
        }

        getTasks()
    }, [])

    const handleSubmit = async(e) =>{
        e.preventDefault()

        const newTask = {
            taskName,
            taskDescription,
            pomodoroCount,
            isDone: false,
            status: 'unfinished',
            projectId: location.state.id
        }

        const response = await send(newTask, '/task/new')
        setTasks([...tasks, response.message])

        if(!response.success){
            throw Error('Some error occured')
        }

        setTaskName('')
        setTaskDescription('')
        setPomodoroCount(0)
        setOpen(false)
    }

    return ( 
        <>
            <Header />
            <section>
                <div className={`flex items-center justify-between mb-2`}>
                    <h2 className={`text-md font-semibold`}>
                        {location.state.projectName}
                    </h2>

                    <button
                        className={`text-xs`}
                        onClick={() => setOpen(true)}
                    >
                        Add Task
                    </button>
                </div>
                {!tasks || tasks.length <= 0 ? (
                    <div className={`text-sm font-light text-center my-5`}>
                        <p>You did not set any task for this project.</p>
                        <p 
                            className={`cursor-pointer hover:text-blue-400`}
                            onClick={() => setOpen(true)}
                        >
                            Set tasks now.
                        </p>
                    </div>
                ) : tasks.map((task) =>(
                    <Card 
                        key={task.taskName}
                    >
                        <div className="flex justify-between items-center">
                            <h3 className='font-semibold'>
                            {task.taskName}
                            </h3>
                        </div>
                    </Card>
                ))}
            </section>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <form onSubmit={handleSubmit}>
                    <h2 className='text-sm'>Lets breakdown your project</h2>
                    <div className='bg-gray-800'>
                        <div className="px-2 py-3 flex flex-col">
                            <label htmlFor="projectName" className='text-xs font-medium tracking-wide mb-1.5'>Task Name</label>
                            <input 
                                type="text" 
                                className='border-2 border-gray-500 rounded-sm py-1 px-2 text-sm font-light outline-none' 
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                            />
                        </div>
                        <div className="p-2 flex flex-col">
                            <label htmlFor="projectName" className='text-xs font-medium tracking-wide mb-1.5'>Task Description</label>
                            <textarea 
                                type="text" 
                                className='border-2 border-gray-500 rounded-sm py-1 px-2 text-sm font-light outline-none' 
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="px-2 py-3 mb-3 flex flex-col">
                            <label htmlFor="projectName" className='text-xs font-medium tracking-wide mb-1.5'>How many Pomodoro you need?</label>
                            <input 
                                type="number" 
                                className='border-2 border-gray-500 rounded-sm py-1 px-2 text-sm font-light outline-none' 
                                value={pomodoroCount}
                                onChange={(e) => setPomodoroCount(e.target.value)}
                            />
                        </div>
                        <div className='flex justify-center'>
                            <button className='text-sm'>Add Task</button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
     );
}
 
export default Project;